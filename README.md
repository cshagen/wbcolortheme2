# wbcolortheme2
A theme for openWB 2 (http://openwb.de)

Alpha version, still work in progress, like the openWB 2.0

## Testing locally (npm required):
The theme is not yet integrated in the openWB2.0 release. It can be installed separately on the same Raspberry PI as the openWB 2 and will get its data from the openWB

Checkout the code, then ```cd wbcolortheme2```

Install required libraries:
```
npm install
```

Run the development webserver with the theme:
```
npm run serve
```

Access the theme from your browser:
```
http://<address of openWB>:8080
``` 

## Docker based install
(Based to the faboulous work of yankee, as published in the openWB forum)

Copy the two files from the "docker-scripts" directory in this repository into an empty directory

In this directory, build the container:
``` docker build -t openwb2 . ```

Then start the container:
``` docker run --name openwb2 -p 7080:80 -p 1883:1883 -p 9001:9001 -p 8080:8080 -it openwb2 ```

Start the colors theme:
``` docker exec -ti openwb2 sh -c "cd /home/pi/wbcolortheme2;npm run serve" ```

In a web browser, you can then access both the openWB and the colors theme:

openwb2 frontend (with standard theme):
``` http://localhost:7080 ```

colors-Theme:
``` http://localhost:8080 ```

