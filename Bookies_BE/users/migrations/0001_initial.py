# Generated by Django 5.1.4 on 2025-01-07 18:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        # migrations.CreateModel(
        #     name="Profile",
        #     fields=[
        #         ("profile_id", models.AutoField(primary_key=True, serialize=False)),
        #         ("phonenumber", models.CharField(max_length=12)),
        #         ("sex", models.BooleanField()),
        #         ("birthday", models.DateField()),
        #         (
        #             "user",
        #             models.OneToOneField(
        #                 on_delete=django.db.models.deletion.CASCADE,
        #                 related_name="user",
        #                 to=settings.AUTH_USER_MODEL,
        #             ),
        #         ),
        #     ],
        #     options={
        #         "db_table": "user_profile",
        #     },
        # ),
    ]
