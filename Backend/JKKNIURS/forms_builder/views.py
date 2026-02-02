from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from .models import Form, FormField, FormSubmission, FieldValue
from .serializers import (
    FormSerializer, 
    FormListSerializer, 
    FormSubmissionSerializer,
    FormSubmissionCreateSerializer
)


class FormViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing forms.
    """
    
    queryset = Form.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return FormListSerializer
        return FormSerializer
    
    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser, JSONParser])
    def submit(self, request, slug=None):
        """Submit a form."""
        form = self.get_object()
        
        # Get the IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')
        
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Create submission
        submission = FormSubmission.objects.create(
            form=form,
            ip_address=ip_address,
            user_agent=user_agent[:500] if user_agent else None
        )
        
        # Process form data
        errors = []
        for field in form.fields.all():
            field_key = str(field.id)
            field_name = f"field_{field.id}"
            
            # Check both possible key formats
            value = request.data.get(field_key) or request.data.get(field_name) or request.data.get(field.label)
            file_value = request.FILES.get(field_key) or request.FILES.get(field_name)
            
            # Validate required fields
            if field.required and not value and not file_value:
                errors.append(f"Field '{field.label}' is required.")
                continue
            
            # Create field value
            field_value = FieldValue(
                submission=submission,
                field=field
            )
            
            if file_value:
                field_value.file = file_value
            else:
                field_value.value = value or ""
            
            field_value.save()
        
        if errors:
            # Delete submission if there are errors
            submission.delete()
            return Response(
                {'errors': errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response({
            'success': True,
            'message': form.success_message,
            'submission_id': submission.id
        }, status=status.HTTP_201_CREATED)


class FormSubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing submissions (admin only).
    """
    
    queryset = FormSubmission.objects.all()
    serializer_class = FormSubmissionSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        form_slug = self.request.query_params.get('form')
        if form_slug:
            queryset = queryset.filter(form__slug=form_slug)
        return queryset
