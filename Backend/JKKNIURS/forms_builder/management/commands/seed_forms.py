"""
Management command to create a sample Contact Us form.
Run with: python manage.py seed_forms
"""
from django.core.management.base import BaseCommand
from forms_builder.models import Form, FormField


class Command(BaseCommand):
    help = 'Create a sample Contact Us form'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample forms...')
        
        # Delete existing forms (optional - comment out to preserve)
        # Form.objects.all().delete()
        
        # Create Contact Us form
        contact_form, created = Form.objects.get_or_create(
            slug='contact-us',
            defaults={
                'title': 'Contact Us',
                'description': 'Get in touch with JKKNIU Research Society. We would love to hear from you!',
                'is_active': True,
                'success_message': 'Thank you for reaching out! We will get back to you within 24-48 hours.'
            }
        )
        
        if created:
            # Create form fields
            FormField.objects.create(
                form=contact_form,
                label='Full Name',
                field_type='text',
                placeholder='Enter your full name',
                required=True,
                order=1
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Email Address',
                field_type='email',
                placeholder='Enter your email address',
                required=True,
                order=2
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Phone Number',
                field_type='phone',
                placeholder='Enter your phone number (optional)',
                required=False,
                order=3
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Department',
                field_type='select',
                choices='Computer Science & Engineering\nElectrical & Electronic Engineering\nBusiness Administration\nEconomics\nEnglish\nBangla\nMathematics\nPhysics\nChemistry\nOther',
                required=False,
                order=4
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Subject',
                field_type='text',
                placeholder='What is this regarding?',
                required=True,
                max_length=200,
                order=5
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Message',
                field_type='textarea',
                placeholder='Write your message here...',
                required=True,
                order=6
            )
            
            FormField.objects.create(
                form=contact_form,
                label='Attachment',
                field_type='file',
                help_text='Optional: Attach any relevant documents (PDF, DOC, etc.)',
                required=False,
                order=7
            )
            
            self.stdout.write(self.style.SUCCESS(f'Created Contact Us form with {contact_form.fields.count()} fields'))
        else:
            self.stdout.write(self.style.WARNING('Contact Us form already exists'))
        
        # Create Membership Application form
        membership_form, created = Form.objects.get_or_create(
            slug='membership-application',
            defaults={
                'title': 'Membership Application',
                'description': 'Apply to become a member of JKKNIU Research Society',
                'is_active': True,
                'success_message': 'Thank you for applying! Your application is under review. We will contact you soon.'
            }
        )
        
        if created:
            FormField.objects.create(
                form=membership_form,
                label='Full Name',
                field_type='text',
                placeholder='Enter your full name',
                required=True,
                order=1
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Email',
                field_type='email',
                placeholder='Enter your email',
                required=True,
                order=2
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Phone',
                field_type='phone',
                placeholder='Enter your phone number',
                required=True,
                order=3
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Student ID',
                field_type='text',
                placeholder='Enter your student ID',
                required=True,
                order=4
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Department',
                field_type='select',
                choices='Computer Science & Engineering\nElectrical & Electronic Engineering\nBusiness Administration\nEconomics\nEnglish\nBangla\nMathematics\nPhysics\nChemistry\nOther',
                required=True,
                order=5
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Year of Study',
                field_type='select',
                choices='1st Year\n2nd Year\n3rd Year\n4th Year\nMasters\nPhD',
                required=True,
                order=6
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Research Interests',
                field_type='textarea',
                placeholder='Describe your research interests...',
                required=True,
                order=7
            )
            
            FormField.objects.create(
                form=membership_form,
                label='Profile Photo',
                field_type='image',
                help_text='Upload a recent passport-sized photo',
                required=False,
                order=8
            )
            
            self.stdout.write(self.style.SUCCESS(f'Created Membership Application form with {membership_form.fields.count()} fields'))
        else:
            self.stdout.write(self.style.WARNING('Membership Application form already exists'))
        
        self.stdout.write(self.style.SUCCESS(f'Total forms: {Form.objects.count()}'))
