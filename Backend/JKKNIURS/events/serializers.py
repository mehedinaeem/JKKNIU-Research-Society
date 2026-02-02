from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    """Serializer for Event model."""
    
    is_upcoming = serializers.ReadOnlyField()
    speakers_list = serializers.ReadOnlyField()
    banner_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'date',
            'time',
            'location',
            'event_type',
            'attendees',
            'registration_deadline',
            'speakers',
            'speakers_list',
            'banner_image',
            'banner_image_url',
            'is_featured',
            'is_upcoming',
            'created_at',
            'updated_at',
        ]
    
    def get_banner_image_url(self, obj):
        """Return full URL for banner image."""
        if obj.banner_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.banner_image.url)
            return obj.banner_image.url
        return None
