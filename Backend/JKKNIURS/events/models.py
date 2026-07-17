from django.db import models
from django.utils import timezone


class Event(models.Model):
    """Model for managing events in the research society."""

    EVENT_TYPES = [
        ('Conference', 'Conference'),
        ('Workshop', 'Workshop'),
        ('Symposium', 'Symposium'),
        ('Seminar', 'Seminar'),
        ('Webinar', 'Webinar'),
        ('Panel Discussion', 'Panel Discussion'),
        ('Recruitment', 'Recruitment'),
        ('Milestone', 'Milestone'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., 10:00 AM - 5:00 PM")
    location = models.CharField(max_length=255)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='Workshop')
    attendees = models.PositiveIntegerField(default=0, help_text="Expected or actual number of attendees")
    registration_deadline = models.DateField(blank=True, null=True)
    speakers = models.TextField(blank=True, null=True, help_text="Comma-separated list of speakers")
    banner_image = models.ImageField(upload_to='events/banners/', blank=True, null=True)
    is_featured = models.BooleanField(default=False, help_text="Feature this event prominently")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return f"{self.title} - {self.date}"

    @property
    def is_upcoming(self):
        """Check if the event is upcoming (date is in the future or today)."""
        return self.date >= timezone.now().date()

    @property
    def speakers_list(self):
        """Return speakers as a list."""
        if self.speakers:
            return [s.strip() for s in self.speakers.split(',')]
        return []
