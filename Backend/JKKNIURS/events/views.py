from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing events.
    Read-only for public access - events are managed via Django admin.
    """
    
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        """Return events ordered by date."""
        return Event.objects.all().order_by('-date')
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Return only upcoming events."""
        today = timezone.now().date()
        upcoming_events = Event.objects.filter(date__gte=today).order_by('date')
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def past(self, request):
        """Return only past events."""
        today = timezone.now().date()
        past_events = Event.objects.filter(date__lt=today).order_by('-date')
        serializer = self.get_serializer(past_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Return featured events."""
        featured_events = Event.objects.filter(is_featured=True).order_by('-date')
        serializer = self.get_serializer(featured_events, many=True)
        return Response(serializer.data)
