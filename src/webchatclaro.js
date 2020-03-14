"use strict";

var changeBubble = null;
var customerName = "";
var customerPhone = "";
var customerCpf = "";
var lpCode = "";
document.addEventListener("DOMContentLoaded", function() {
  var client = new BlipChat();
  var bubble;
  var bubbleContainer;
  var closeIcon;
  var iconId = "blip-chat-icon";
  var closeId = "blip-chat-close-icon";
  var chatContainer = "blip-chat-container";
  var startingColor = "#ffbc4a";
  var displayClassName = "display";
  var hideClassName = "hide";
  var appKey =
    "bGFkaW5ncGFnZWJvdDoxZDRiZDQ3OC1kNDU2LTQ4NzItYmI2MS02MTU0NjNlNTJkNTk=";
  var bottomImage =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4ICg0NzIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QkxpUDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJCTGlQIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iYnJhbmQtbG9nby0oMSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuMDAwMDAwLCA5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjE3MTAzMjQsMCBDOC41MDMxMTkzNCwwIDUuNzM4MTQ3MTksMC40MTkwNDc2MTggMy44NTM5ODY3LDEuNTU4MzMzMzMgQzAuNzk3ODM3MTI3LDMuNDA0NzYxOSAtMC4wOTYzMjAxNzAyLDcuMDEwNzE0MjkgMC4wMDgwMTg0MDE2NiwxMC4zMzA5NTI0IEMwLjA5Nzc5ODEwMzIsMTMuMjAyMzgxIDAuODgyNzYzODcsMTYuMjg1NzE0MyAyLjk2ODMyMjA2LDE4LjQwNzE0MjkgQzQuOTU4MDM0MzgsMjAuNDI5NzYxOSA5LjA0OTA3Njk4LDIxLjMzOTI4NTcgMTEuODM4MzEzOSwyMS4zMzkyODU3IEMxMS45NjQ0OTA4LDIxLjMzOTI4NTcgMTIuMDk3OTQ3MSwyMS40Mjg1NzE0IDEyLjA5Nzk0NzEsMjEuNTk0MDQ3NiBMMTIuMDk3OTQ3MSwyNC40OTE2NjY3IEMxMi4wOTc5NDcxLDI0Ljc3NzM4MSAxMi4zMjQ4MjI4LDI1IDEyLjYxNjAwMDIsMjUgQzEyLjYzMjk4NTYsMjUgMTIuNjQ4NzU3NywyNC45OTY0Mjg2IDEyLjY2NDUyOTgsMjQuOTk1MjM4MSBDMTIuNzc0OTM0NiwyNC45ODU3MTQzIDEyLjg3MTk5MzcsMjQuOTQ1MjM4MSAxMi45NDk2NDEsMjQuODgyMTQyOSBDMTQuMzU1Nzg1MywyMy43MDM1NzE0IDE1Ljc2MDcxNjMsMjIuNTAzNTcxNCAxNy4xMTcxMTc3LDIxLjI3MDIzODEgQzE4LjQxNzcxMDEsMjAuMDg2OTA0OCAxOS44OTA1ODI1LDE4Ljg3MTQyODYgMjAuOTA3Mjc3LDE3LjQ1NDc2MTkgQzIzLjA1MjI4MzksMTQuNDY2NjY2NyAyMy4zNzAxNTI2LDEwLjI0MTY2NjcgMjIuNjU5MTk0NCw2LjczOTI4NTcxIEMyMS45NzQ5Mjc1LDMuMzY5MDQ3NjEgMTkuNTM1MTAzNSwxLjE3NSAxNi4xMTQ5ODIxLDAuNDc2MTkwNDc1IEMxNC43MDc2MjQ3LDAuMTg5Mjg1NzE0IDEyLjk2MTc3MzQsMCAxMS4xNzEwMzI0LDAgTTExLjE3MTAzMjQsMS4yMTMwOTUyNCBDMTIuNzczNzIxMywxLjIxMzA5NTI0IDE0LjQzOTQ5ODgsMS4zNzI2MTkwNSAxNS44NjM4NDE2LDEuNjYzMDk1MjQgQzE4Ljg5NDUxMzEsMi4yODIxNDI4NiAyMC44NzY5NDYsNC4xNjkwNDc2MSAyMS40NDcxNjg1LDYuOTc2MTkwNDcgQzIxLjc5NTM2ODEsOC42OTE2NjY2OCAyMS44NTg0NTY1LDEwLjQ3MjYxOSAyMS42MzAzNjc2LDEyLjEyNjE5MDUgQzIxLjM3ODAxMzgsMTMuOTQ4ODA5NSAyMC43OTQ0NDU3LDE1LjUwNTk1MjQgMTkuODk2NjQ4NywxNi43NTU5NTI0IEMxOS4xMjc0NTUxLDE3LjgyODU3MTQgMTguMDE4NTU0NCwxOC44MjAyMzgxIDE2Ljk0NjA1MSwxOS43Nzk3NjE5IEMxNi43MjAzODg1LDE5Ljk4MDk1MjQgMTYuNDk1OTM5MiwyMC4xODIxNDI5IDE2LjI3NjM0MjksMjAuMzgwOTUyNCBDMTUuMjgwMjczNSwyMS4yODgwOTUyIDE0LjI3MjA3MTgsMjIuMTYxOTA0OCAxMy4zMzMwMjQ2LDIyLjk1OTUyMzggTDEzLjMzMzAyNDYsMjEuNTk0MDQ3NiBDMTMuMzMzMDI0NiwyMC43ODQ1MjM4IDEyLjY2MzMxNjYsMjAuMTI3MzgxIDExLjgzODMxMzksMjAuMTI3MzgxIEM5LjE5MTAyNTk3LDIwLjEyNzM4MSA1LjQ5NDI4NjEsMTkuMjI4NTcxNCAzLjg1NzYyNjQsMTcuNTY1NDc2MiBDMS44MjA1OTc3OCwxNS40OTI4NTcxIDEuMzExMDM3MzEsMTIuNDY2NjY2NyAxLjI0MzA5NTkyLDEwLjI5NDA0NzYgQzEuMTc3NTgxLDguMTkxNjY2NjggMS41MTM2NDgyNiw0LjM5NjQyODU3IDQuNTAzMDY5NjYsMi41OTA0NzYxOSBDNS45NzIzMDIzNiwxLjcwMjM4MDk1IDguMzQwNTQ1MjcsMS4yMTMwOTUyNCAxMS4xNzEwMzI0LDEuMjEzMDk1MjQiIGlkPSJGaWxsLTIwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
  var topImage =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4ICg0NzIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QkxpUDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJCTGlQIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iYnJhbmQtbG9nby0oMSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuMDAwMDAwLCA5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjE3MTAzMjQsMCBDOC41MDMxMTkzNCwwIDUuNzM4MTQ3MTksMC40MTkwNDc2MTggMy44NTM5ODY3LDEuNTU4MzMzMzMgQzAuNzk3ODM3MTI3LDMuNDA0NzYxOSAtMC4wOTYzMjAxNzAyLDcuMDEwNzE0MjkgMC4wMDgwMTg0MDE2NiwxMC4zMzA5NTI0IEMwLjA5Nzc5ODEwMzIsMTMuMjAyMzgxIDAuODgyNzYzODcsMTYuMjg1NzE0MyAyLjk2ODMyMjA2LDE4LjQwNzE0MjkgQzQuOTU4MDM0MzgsMjAuNDI5NzYxOSA5LjA0OTA3Njk4LDIxLjMzOTI4NTcgMTEuODM4MzEzOSwyMS4zMzkyODU3IEMxMS45NjQ0OTA4LDIxLjMzOTI4NTcgMTIuMDk3OTQ3MSwyMS40Mjg1NzE0IDEyLjA5Nzk0NzEsMjEuNTk0MDQ3NiBMMTIuMDk3OTQ3MSwyNC40OTE2NjY3IEMxMi4wOTc5NDcxLDI0Ljc3NzM4MSAxMi4zMjQ4MjI4LDI1IDEyLjYxNjAwMDIsMjUgQzEyLjYzMjk4NTYsMjUgMTIuNjQ4NzU3NywyNC45OTY0Mjg2IDEyLjY2NDUyOTgsMjQuOTk1MjM4MSBDMTIuNzc0OTM0NiwyNC45ODU3MTQzIDEyLjg3MTk5MzcsMjQuOTQ1MjM4MSAxMi45NDk2NDEsMjQuODgyMTQyOSBDMTQuMzU1Nzg1MywyMy43MDM1NzE0IDE1Ljc2MDcxNjMsMjIuNTAzNTcxNCAxNy4xMTcxMTc3LDIxLjI3MDIzODEgQzE4LjQxNzcxMDEsMjAuMDg2OTA0OCAxOS44OTA1ODI1LDE4Ljg3MTQyODYgMjAuOTA3Mjc3LDE3LjQ1NDc2MTkgQzIzLjA1MjI4MzksMTQuNDY2NjY2NyAyMy4zNzAxNTI2LDEwLjI0MTY2NjcgMjIuNjU5MTk0NCw2LjczOTI4NTcxIEMyMS45NzQ5Mjc1LDMuMzY5MDQ3NjEgMTkuNTM1MTAzNSwxLjE3NSAxNi4xMTQ5ODIxLDAuNDc2MTkwNDc1IEMxNC43MDc2MjQ3LDAuMTg5Mjg1NzE0IDEyLjk2MTc3MzQsMCAxMS4xNzEwMzI0LDAgTTExLjE3MTAzMjQsMS4yMTMwOTUyNCBDMTIuNzczNzIxMywxLjIxMzA5NTI0IDE0LjQzOTQ5ODgsMS4zNzI2MTkwNSAxNS44NjM4NDE2LDEuNjYzMDk1MjQgQzE4Ljg5NDUxMzEsMi4yODIxNDI4NiAyMC44NzY5NDYsNC4xNjkwNDc2MSAyMS40NDcxNjg1LDYuOTc2MTkwNDcgQzIxLjc5NTM2ODEsOC42OTE2NjY2OCAyMS44NTg0NTY1LDEwLjQ3MjYxOSAyMS42MzAzNjc2LDEyLjEyNjE5MDUgQzIxLjM3ODAxMzgsMTMuOTQ4ODA5NSAyMC43OTQ0NDU3LDE1LjUwNTk1MjQgMTkuODk2NjQ4NywxNi43NTU5NTI0IEMxOS4xMjc0NTUxLDE3LjgyODU3MTQgMTguMDE4NTU0NCwxOC44MjAyMzgxIDE2Ljk0NjA1MSwxOS43Nzk3NjE5IEMxNi43MjAzODg1LDE5Ljk4MDk1MjQgMTYuNDk1OTM5MiwyMC4xODIxNDI5IDE2LjI3NjM0MjksMjAuMzgwOTUyNCBDMTUuMjgwMjczNSwyMS4yODgwOTUyIDE0LjI3MjA3MTgsMjIuMTYxOTA0OCAxMy4zMzMwMjQ2LDIyLjk1OTUyMzggTDEzLjMzMzAyNDYsMjEuNTk0MDQ3NiBDMTMuMzMzMDI0NiwyMC43ODQ1MjM4IDEyLjY2MzMxNjYsMjAuMTI3MzgxIDExLjgzODMxMzksMjAuMTI3MzgxIEM5LjE5MTAyNTk3LDIwLjEyNzM4MSA1LjQ5NDI4NjEsMTkuMjI4NTcxNCAzLjg1NzYyNjQsMTcuNTY1NDc2MiBDMS44MjA1OTc3OCwxNS40OTI4NTcxIDEuMzExMDM3MzEsMTIuNDY2NjY2NyAxLjI0MzA5NTkyLDEwLjI5NDA0NzYgQzEuMTc3NTgxLDguMTkxNjY2NjggMS41MTM2NDgyNiw0LjM5NjQyODU3IDQuNTAzMDY5NjYsMi41OTA0NzYxOSBDNS45NzIzMDIzNiwxLjcwMjM4MDk1IDguMzQwNTQ1MjcsMS4yMTMwOTUyNCAxMS4xNzEwMzI0LDEuMjEzMDk1MjQiIGlkPSJGaWxsLTIwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
  var bubbleMessage = "Olá, posso ajudar?";
  var startMessage = {
    type: "text/plain",
    content: "start",
    metadata: {
      "#blip.hiddenMessage": true
    }
  };

  function displayBubble() {
    bubble.classList.add(displayClassName);
    bubble.classList.remove(hideClassName);
  }

  function hideBubble() {
    bubble.classList.add(hideClassName);
    bubble.classList.remove(displayClassName);
  }

  changeBubble = function changeBubble() {
    if (bubble.classList.contains(displayClassName)) hideBubble();
    else displayBubble();
  };

  function createBubble() {
    bubbleContainer = document.createElement("div");
    bubbleContainer.id = "bubble-container";
    bubble = document.createElement("div");
    bubble.id = "message-bubble";

    bubble.onclick = function() {
      client.widget._openChat();
    };

    var triangle = document.createElement("div");
    triangle.id = "triangle";
    var message = document.createElement("div");
    message.id = "message";
    message.innerHTML = bubbleMessage;
    bubble.appendChild(message);
    bubble.appendChild(triangle);
    bubbleContainer.appendChild(bubble);
    document.querySelector("#".concat(chatContainer)).prepend(bubbleContainer);
  }

  function replaceImageStructure() {
    closeIcon = document.querySelector("#".concat(closeId));
    var oldImage = document.querySelector("#".concat(iconId));
    var container = document.createElement("div");
    container.id = iconId;
    var img1 = document.createElement("img");
    img1.src = topImage;
    img1.classList.add("top");
    var img2 = document.createElement("img");
    img2.src = bottomImage;
    img2.classList.add("bottom");
    container.appendChild(img1);
    container.appendChild(img2);
    oldImage.parentElement.insertBefore(container, oldImage);
    oldImage.remove();
  }

  client
    .withAppKey(appKey)
    .withCustomStyle(
      ".disable-selection {\n        color: #000;\n      }\n      .pointer {\n        background: #ffbc4a;\n        border-radius: 10px;\n        margin-top: 10px;\n        color: #000;\n        font-weight: 700;\n        font-size: 1.4rem;\n        font-size: 17px;\n        border-radius: 25.5px;\n      }"
    )
    .withButton({
      color: startingColor
    })
    .withEventHandler(BlipChat.CREATE_ACCOUNT_EVENT, function() {
      client.sendMessage(startMessage);
    })
    .withEventHandler(BlipChat.ENTER_EVENT, function() {
      closeIcon.classList.add(displayClassName);
      closeIcon.classList.remove(hideClassName);
      hideBubble();
    })
    .withEventHandler(BlipChat.LEAVE_EVENT, function() {
      closeIcon.classList.add(hideClassName);
      closeIcon.classList.remove(displayClassName);
    })
    .withAccount({
      extras: {
        code: lpCode,
        cpf: customerCpf,
        cd:"Campo opcional (Cliente Migração), exibir planos que o cliente terá acesso conforme mailing"
      }
    })
    .build();
  replaceImageStructure();
  createBubble();
  displayBubble();
  setTimeout(function() {
    hideBubble();
  }, 10000);
});
