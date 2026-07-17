from django.contrib import admin
from .models import Form, FormField, FormSubmission, FieldValue


class FormFieldInline(admin.TabularInline):
    """Inline admin for form fields."""
    model = FormField
    extra = 1
    ordering = ['order', 'id']
    fields = ['label', 'field_type', 'required', 'placeholder', 'choices', 'order']


class FieldValueInline(admin.TabularInline):
    """Inline admin for field values in a submission."""
    model = FieldValue
    extra = 0
    readonly_fields = ['field', 'value', 'file']
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    """Admin configuration for Form model."""

    list_display = ['title', 'slug', 'is_active', 'field_count', 'submission_count', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    inlines = [FormFieldInline]

    fieldsets = (
        ('Form Details', {
            'fields': ('title', 'description', 'slug', 'is_active')
        }),
        ('Settings', {
            'fields': ('success_message',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def field_count(self, obj):
        return obj.fields.count()
    field_count.short_description = 'Fields'

    def submission_count(self, obj):
        return obj.submissions.count()
    submission_count.short_description = 'Submissions'


@admin.register(FormField)
class FormFieldAdmin(admin.ModelAdmin):
    """Admin configuration for FormField model."""

    list_display = ['label', 'form', 'field_type', 'required', 'order']
    list_filter = ['form', 'field_type', 'required']
    search_fields = ['label', 'form__title']
    ordering = ['form', 'order', 'id']


@admin.register(FormSubmission)
class FormSubmissionAdmin(admin.ModelAdmin):
    """Admin configuration for FormSubmission model."""

    list_display = ['form', 'submitted_at', 'ip_address', 'value_summary']
    list_filter = ['form', 'submitted_at']
    search_fields = ['form__title']
    readonly_fields = ['form', 'submitted_at', 'ip_address', 'user_agent']
    inlines = [FieldValueInline]

    def value_summary(self, obj):
        """Show first few field values as summary."""
        values = obj.values.all()[:3]
        summary = ", ".join([f"{v.field.label}: {v.value[:30] if v.value else 'File'}" for v in values])
        if obj.values.count() > 3:
            summary += "..."
        return summary or "No values"
    value_summary.short_description = 'Summary'

    def has_add_permission(self, request):
        return False


@admin.register(FieldValue)
class FieldValueAdmin(admin.ModelAdmin):
    """Admin configuration for FieldValue model."""

    list_display = ['submission', 'field', 'value', 'file']
    list_filter = ['field__form', 'field__field_type']
    search_fields = ['value', 'field__label']
    readonly_fields = ['submission', 'field', 'value', 'file']

    def has_add_permission(self, request):
        return False
