"""
Management command to seed sample events data.
Run with: python manage.py seed_events
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from events.models import Event


class Command(BaseCommand):
    help = 'Seed sample events data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding events...')
        
        today = timezone.now().date()
        
        # Clear existing events
        Event.objects.all().delete()
        
        # Upcoming Events
        Event.objects.create(
            title='Young Researcher Recruitment 6.0',
            description='Join the Young Researcher Recruitment 6.0 program! This is an exciting opportunity for undergraduate and graduate students to showcase their research skills, collaborate with experienced researchers, and contribute to groundbreaking research projects at JKKNIU Research Society.',
            date=today + timedelta(days=15),
            time='10:00 AM - 5:00 PM',
            location='JKKNIU Main Campus',
            event_type='Recruitment',
            attendees=250,
            registration_deadline=today + timedelta(days=10),
            speakers='JKKNIU Research Society Leadership, Senior Researchers and Mentors',
            is_featured=True
        )
        
        # Past Events
        Event.objects.create(
            title='Basic Research Training in Writing & Structuring Research Reports',
            description='Dr. Tion R. Swaford, Marian University, USA conducted this session on writing and structuring research reports.',
            date=today - timedelta(days=30),
            location='Online / JKKNIU',
            event_type='Workshop',
            attendees=100
        )
        
        Event.objects.create(
            title='Basic Research ও Research Methodology কর্মশালা',
            description='Part of the ongoing workshop series on Basic Research and Methodology.',
            date=today - timedelta(days=60),
            location='JKKNIU Campus',
            event_type='Workshop',
            attendees=120
        )
        
        Event.objects.create(
            title='Basics of Social Research কর্মশালা',
            description='Conducted by Dr. Md. Bakhtiar Uddin, JKKNIU.',
            date=today - timedelta(days=90),
            location='JKKNIU Campus',
            event_type='Workshop',
            attendees=80
        )
        
        Event.objects.create(
            title='Stipendium Hungaricum স্কলারশিপ ওয়েবিনার',
            description='A session guiding students on the Stipendium Hungaricum Scholarship application process.',
            date=today - timedelta(days=120),
            location='Online Webinar',
            event_type='Webinar',
            attendees=200
        )
        
        Event.objects.create(
            title='ফ্রেশার্স রিসেপশন ও উচ্চশিক্ষা বিষয়ক সেমিনার',
            description='Annual reception for new batches and seminar on higher education opportunities.',
            date=today - timedelta(days=150),
            location='JKKNIU Auditorium',
            event_type='Seminar',
            attendees=300
        )
        
        Event.objects.create(
            title='Research Excellence: Roadmap for Emerging Scholars',
            description="Speaker: Dr. Allahi, recognized as one of the world's top 2% researchers.",
            date=today - timedelta(days=180),
            location='JKKNIU Campus',
            event_type='Seminar',
            attendees=150
        )
        
        Event.objects.create(
            title='Python প্রোগ্রামিং কর্মশালা',
            description='Hands-on training on Python programming for research and data analysis.',
            date=today - timedelta(days=365),
            location='Computer Lab, JKKNIU',
            event_type='Workshop',
            attendees=60
        )
        
        Event.objects.create(
            title='JKKNIU Research Society প্রতিষ্ঠা',
            description='Founding of JKKNIU Research Society and official recognition in Kaler Kantho.',
            date=today - timedelta(days=730),
            location='JKKNIU',
            event_type='Milestone',
            attendees=0
        )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {Event.objects.count()} events'))
