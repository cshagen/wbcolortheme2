// functions to interact with MQTT
import mqtt from "mqtt"

const defaultQoS: mqtt.QoS = 0
const mqttConnection = {
  host: location.hostname,
  port: 9001,
  endpoint: "/",
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 4000,
  clientId: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(0, 6),
  username: "openWB",
  password: "openWB",
}
const subscription = {
  topic: "",
  qos:  defaultQoS,
}
let client: mqtt.MqttClient

//export function MqttConnect(callback: (t: string, m: string) => void, topiclist: string[]) {
  const { host, port, endpoint, ...options } = mqttConnection;
  const connectUrl = `ws://${host}:${port}${endpoint}`;
  try {
    client = mqtt.connect(connectUrl, options);
    client.on('connect', () => {
      console.info('MQTT connection successful');
      // topiclist.forEach((topic) => {
      //  subscribe(topic);
      // });
    })
    client.on("error", (error) => {
      console.error('MQTT connection failed: ', error);
    })
  } catch (error) {
    console.error('MQTT connect error: ', error);
  }
  
  
//}
export function mqttRegister(callback:(t: string, m: string) => void) {
  if (client) {
    client.on("message", callback);
  } else {
    console.error('MqttRegister: MQTT client not available' )
  }
}
export function mqttSubscribe(toTopic: string) {
  subscription.topic = toTopic;
  const { topic, qos } = subscription;
  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.error("MQTT Subscription error: " + error);
      return;
    }
    console.info("MQTT Subscription successful: " + toTopic);
  })
}
export function mqttUnsubscribe(fromTopic: string) {
  subscription.topic = fromTopic;
  const { topic } = subscription;
  client.unsubscribe(topic, (error: Error) => {
    if (error) {
      console.error(
        "MQTT Unsubscribe from " + fromTopic + " failed: " + error
      );
      return;
    }
    console.info ('MQTT unsubscribe successful: ' + topic)
  })
}
export function mqttPublish(topic: string, message: string) {
  const qos: mqtt.QoS = 0;
  client.publish(topic, message, { qos }, (error) => {
    if (error) {
      console.warn("MQTT publish error: ", error);
    }
    console.info("Message sent: [" + topic + "](" + message + ')');
  });
}

