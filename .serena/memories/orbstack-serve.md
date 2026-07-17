# Orbstack — запуск lovii_demo

## Статус
Orbstack запущен (`orb status: Running`).

## Docker контейнер
```
NAMES        IMAGE        PORTS                                     STATUS
lovii-demo   lovii-demo   0.0.0.0:8080->80/tcp                     Up X hours
```

## Доступ
- **URL**: https://lovii-demo.orb.local/
- **Локальный порт**: 8080 (маппинг на 80 внутри контейнера)

## Как использовать
- Сайт уже работает через Orbstack, не нужно запускать python http.server
- Для пересборки/обновления контейнера: `docker build -t lovii-demo . && docker stop lovii-demo && docker run -d --name lovii-demo -p 8080:80 lovii-demo`
- Для просмотра логов: `docker logs lovii-demo`
- Проект: `/Users/best/Projects/lovii_demo/` — статика (Vanilla JS + CSS + HTML)
