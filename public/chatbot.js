(function () {
  // avoid loading twice
  if (window.__CHATBOT_LOADED__) return;
  window.__CHATBOT_LOADED__ = true;

  var iframe = document.createElement("iframe");

  iframe.src = "https://chatbot11-rouge.vercel.app/"; // your floating chat page
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "14px";
  iframe.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  iframe.style.zIndex = "999999";

  iframe.allow = "clipboard-write; microphone";

  document.body.appendChild(iframe);
})();
