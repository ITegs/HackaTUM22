from django.urls import path
from snippets import views

urlpatterns = [
    path('genUser/', views.snippet_list),
    path('routeInfo/<str:pk>/', views.route_info),
    path('sendTrip/<str:pk>/', views.send_trip),
]
