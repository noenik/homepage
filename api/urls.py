from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views as v

urlpatterns = [
    path('categories/', v.CategoryList.as_view()),
    path('category/<int:pk>', v.CategoryDetail.as_view()),
    path('links/', v.LinkList.as_view()),
    path('link/<int:pk>', v.LinkDetail.as_view()),
    path('linkbulk/', v.LinkBulk.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
