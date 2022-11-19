from django.urls import path
from snippets import views

urlpatterns = [
    path('genUser/', views.snippet_list),
]
