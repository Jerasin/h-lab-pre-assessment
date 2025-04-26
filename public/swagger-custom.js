window.onload = function() {
  // ตรวจสอบว่า swagger-custom.js ทำงานหรือไม่
  console.log('Swagger Custom JS Loaded');
  
  // ตัวอย่างการตั้งค่า UI แบบง่าย
  const ui = SwaggerUIBundle({
    url: "/swagger-json",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    layout: "BaseLayout"
  });
};
