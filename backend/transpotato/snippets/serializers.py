from rest_framework import serializers
from snippets.models import GenUser


class GenUserSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    Username = serializers.CharField()
    score = serializers.IntegerField()
    TotalDistance = serializers.IntegerField()


    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return GenUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.save()
        return instance

class RouteInfoSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    destination = serializers.CharField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return GenUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.save()
        return instance
