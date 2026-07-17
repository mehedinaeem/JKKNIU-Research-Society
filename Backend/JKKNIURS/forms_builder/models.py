from django.db import models
from django.utils.text import slugify
import uuid


class Form(models.Model):
    """A dynamic form that can contain multiple fields."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    success_message = models.TextField(
        default="Thank you for your submission!",
        help_text="Message shown after successful submission"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Form'
        verbose_name_plural = 'Forms'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            self.slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
        super().save(*args, **kwargs)


class FormField(models.Model):
    """A field within a form."""

    FIELD_TYPES = [
        ('text', 'Text'),
        ('email', 'Email'),
        ('number', 'Number'),
        ('phone', 'Phone'),
        ('textarea', 'Text Area'),
        ('select', 'Dropdown Select'),
        ('radio', 'Radio Buttons'),
        ('checkbox', 'Checkbox'),
        ('checkbox_group', 'Checkbox Group'),
        ('file', 'File Upload'),
        ('image', 'Image Upload'),
        ('date', 'Date'),
        ('time', 'Time'),
        ('datetime', 'Date & Time'),
        ('url', 'URL'),
    ]

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='fields')
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPES, default='text')
    placeholder = models.CharField(max_length=255, blank=True, null=True)
    help_text = models.CharField(max_length=500, blank=True, null=True)
    required = models.BooleanField(default=False)
    choices = models.TextField(
        blank=True,
        null=True,
        help_text="For select, radio, checkbox_group: Enter choices separated by new lines"
    )
    default_value = models.CharField(max_length=255, blank=True, null=True)
    min_value = models.IntegerField(blank=True, null=True, help_text="For number fields")
    max_value = models.IntegerField(blank=True, null=True, help_text="For number fields")
    max_length = models.IntegerField(blank=True, null=True, help_text="For text fields")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Form Field'
        verbose_name_plural = 'Form Fields'

    def __str__(self):
        return f"{self.form.title} - {self.label}"

    @property
    def choices_list(self):
        """Return choices as a list."""
        if self.choices:
            return [c.strip() for c in self.choices.split('\n') if c.strip()]
        return []


class FormSubmission(models.Model):
    """A submission of a form."""

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Form Submission'
        verbose_name_plural = 'Form Submissions'

    def __str__(self):
        return f"{self.form.title} - {self.submitted_at.strftime('%Y-%m-%d %H:%M')}"


class FieldValue(models.Model):
    """A value for a specific field in a submission."""

    submission = models.ForeignKey(FormSubmission, on_delete=models.CASCADE, related_name='values')
    field = models.ForeignKey(FormField, on_delete=models.CASCADE)
    value = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='form_uploads/%Y/%m/', blank=True, null=True)

    class Meta:
        verbose_name = 'Field Value'
        verbose_name_plural = 'Field Values'

    def __str__(self):
        return f"{self.field.label}: {self.value or self.file}"

    @property
    def display_value(self):
        """Return the appropriate value for display."""
        if self.file:
            return self.file.url
        return self.value or ""
