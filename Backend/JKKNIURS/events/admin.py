from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Admin configuration for Event model."""

    list_display = ['title', 'event_type', 'date', 'location', 'attendees', 'is_featured', 'is_upcoming']
    list_filter = ['event_type', 'is_featured', 'date']
    search_fields = ['title', 'description', 'location', 'speakers']
    ordering = ['-date']
    date_hierarchy = 'date'

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'event_type', 'is_featured')
        }),
        ('Date & Time', {
            'fields': ('date', 'time', 'registration_deadline')
        }),
        ('Location & Attendance', {
            'fields': ('location', 'attendees')
        }),
        ('Additional Details', {
            'fields': ('speakers', 'banner_image'),
            'classes': ('collapse',)
        }),
    )

    def is_upcoming(self, obj):
        """Display whether event is upcoming."""
        return obj.is_upcoming
    is_upcoming.boolean = True
    is_upcoming.short_description = 'Upcoming'
