from django.urls import path
from snippets import views

urlpatterns = [
    path('genUser/', views.snippet_list),
    path('routeInfo/<str:pk>/', views.route_info),
    path('sendTrip/<str:pk>/', views.send_trip),
    path('getScore/<str:pk>/', views.get_score),
    path('getDistance/<str:pk>/', views.get_distance),
    path('getName/<str:pk>/', views.get_name),
    path('getLvl/<str:pk>/', views.get_lvl),
    path('getMyPos/<str:pk>/', views.get_my_position),
    path('getTopTen', views.get_top_ten),
]
