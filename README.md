# wbcolortheme2
A theme for openWallbox 2.0

Alpha version, still work in progress

## Testing locally:
The theme is not yet integrated in the openWB2.0 release. It can be installed separately on the same Raspberry PI as the openWB 2 and will get its data from the openWB

```
npm install
```

```
npm run serve
```

```
http://<address of openWB>:8080
``` 

## Docker install
(Based to the faboulous work of yankee, as published in the openWB forum)


``` docker build -t openwb2 . ```

``` docker run --name openwb2 -p 7080:80 -p 1883:1883 -p 9001:9001 -p 8080:8080 -it openwb2 ```

``` docker exec -ti openwb2 sh -c "cd /home/pi/wbcolortheme2;npm run serve" ```



Standard-openWB2: 
``` http://localhost:7080 ```

Color-Theme:
``` http://localhost:8080 ```

