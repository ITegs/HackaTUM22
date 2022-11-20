# Generated by Django 4.1.3 on 2022-11-19 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0002_genuser_delete_snippet'),
    ]

    operations = [
        migrations.CreateModel(
            name='RouteInfo',
            fields=[
                ('id', models.CharField(default='bf0442d0-f769-48ab-9488-9347ec8c1364', max_length=36, primary_key=True, serialize=False)),
                ('destination', models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='genuser',
            name='id',
            field=models.CharField(default='36b66c1f-77ba-4b93-82aa-27d5de26ad01', max_length=36, primary_key=True, serialize=False),
        ),
    ]
