from rest_framework import serializers
from .models import Form, FormField, FormSubmission, FieldValue


class FormFieldSerializer(serializers.ModelSerializer):
    """Serializer for FormField model."""
    
    choices_list = serializers.ReadOnlyField()
    
    class Meta:
        model = FormField
        fields = [
            'id',
            'label',
            'field_type',
            'placeholder',
            'help_text',
            'required',
            'choices',
            'choices_list',
            'default_value',
            'min_value',
            'max_value',
            'max_length',
            'order',
        ]


class FormSerializer(serializers.ModelSerializer):
    """Serializer for Form model."""
    
    fields = FormFieldSerializer(many=True, read_only=True)
    
    class Meta:
        model = Form
        fields = [
            'id',
            'title',
            'description',
            'slug',
            'is_active',
            'success_message',
            'fields',
            'created_at',
        ]


class FormListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing forms."""
    
    field_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Form
        fields = [
            'id',
            'title',
            'description',
            'slug',
            'is_active',
            'field_count',
        ]
    
    def get_field_count(self, obj):
        return obj.fields.count()


class FieldValueSerializer(serializers.ModelSerializer):
    """Serializer for field values in submissions."""
    
    field_label = serializers.CharField(source='field.label', read_only=True)
    display_value = serializers.ReadOnlyField()
    
    class Meta:
        model = FieldValue
        fields = ['field', 'field_label', 'value', 'file', 'display_value']


class FormSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for form submissions."""
    
    values = FieldValueSerializer(many=True, read_only=True)
    form_title = serializers.CharField(source='form.title', read_only=True)
    
    class Meta:
        model = FormSubmission
        fields = [
            'id',
            'form',
            'form_title',
            'submitted_at',
            'values',
        ]


class FormSubmissionCreateSerializer(serializers.Serializer):
    """Serializer for creating form submissions."""
    
    form_data = serializers.DictField(
        child=serializers.CharField(allow_blank=True),
        help_text="Dictionary of field_id: value pairs"
    )
    
    def validate_form_data(self, value):
        """Validate that all required fields are present."""
        form = self.context.get('form')
        if not form:
            return value
        
        required_fields = form.fields.filter(required=True)
        for field in required_fields:
            field_key = str(field.id)
            if field_key not in value or not value[field_key]:
                raise serializers.ValidationError(
                    f"Field '{field.label}' is required."
                )
        
        return value
