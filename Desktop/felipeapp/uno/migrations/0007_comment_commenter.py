# Generated by Django 5.0 on 2024-01-03 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uno', '0006_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='commenter',
            field=models.CharField(default='', max_length=100),
        ),
    ]
