// this is our model. It contains all values required by the different parts of the front end
// it is constantly updated when new MQTT events come in

import { reactive, ref, onBeforeMount, toRef } from "vue";

export const topicTree: node[]= reactive([]);
export interface node {
  name: string,
  children: node[],
  count: number,
  lastValue: string
}

export function add(topic: string, message: string) {
  
  const elements = topic.split('/')
  if (elements.length) {
    let found = false
      topicTree.forEach (child => {
      if (child.name == elements[0]) {
        insert(child, elements, message)
        found=true
        
      }
    })
    if (!found) {
        let n = {name: elements[0], children: [], count: 0, lastValue: ""}
        topicTree.push (n)
        insert (n, elements, message)
      }
    }
}

function insert (node: node, topic: string[], message: string) {
  if (topic.length) {
    let subtopic = topic.splice(1)
    if (topic[0] == node.name) {
      if (subtopic.length) { // no leaf node
        let found = false
        node.children.forEach (child => {
          if (child.name == subtopic[0]) {
            insert(child,subtopic, message)
            found = true          
          }
        })
        if (!found) {
          let n : node = {name: subtopic[0], children: [], count: 0, lastValue: ""}
          insert (n, subtopic, message)
          node.children.push(n)
          
        }
      } else { // this is a leaf
        node.count = node.count + 1
        node.lastValue = message
       // console.log(topicTree);
      }
    }    
  }
}