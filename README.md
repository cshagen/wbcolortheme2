# wbcolortheme2
Ein Theme für die openWB2 (http://openwb.de)

Alpha version, basierend auf der Alpha der openwb2.

![picture of theme](colors1.png)

Das theme is noch nicht in die openwb2 integriert. Es läuft standalone auf dem gleichen Rechner wie die openwb2 selbst. Entweder direkt auf dem Raspberry Pi oder in einem Docker Container:

## Installation auf Raspi mit openwb2 (node.js notwendig):

Code auschecken, dann ```cd wbcolortheme2```

Installieren:
```
npm install
```

Webserver mit theme starten:
```
npm run serve
```

Zugrigg im Browser:
```
http://<address of openWB>:8080
``` 

## Docker-Installation (zusammen mit openwb2)
(Eine Erweiterung der wunderbaren Lösung von yankee)

Die zwei Dateien aus dem "docker-scripts"-Verzeichnis in einen Ordner kopieren.

In diesem Ordner den Container bauen:
``` docker build -t openwb2 . ```

In einer shell den Container starten:
``` docker run --name openwb2 -p 7080:80 -p 1883:1883 -p 9001:9001 -p 8080:8080 -it openwb2 ```

In einer zweiten shell das colors-theme starten:
``` docker exec -ti openwb2 sh -c "cd /home/pi/wbcolortheme2;npm run serve" ```

Im Browser kann nun das Standard-Theme (inklusive Konfiguration) und das colors-theme zugegriffen werden:

openwb2 frontend (mit standard-theme und Konfiguration):
``` http://localhost:7080 ```

colors-Theme:
``` http://localhost:8080 ```

