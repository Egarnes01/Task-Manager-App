from django.urls import path
from . import views

urlpatterns = [
    path('', views.task_list, name='task_list'),  # Home page shows task list
    path('signup/', views.signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('task/new/', views.task_create, name='task_create'),
    path('task/<int:task_id>/edit/', views.task_update, name='task_update'),
    path('task/<int:task_id>/delete/', views.task_delete, name='task_delete'),
]