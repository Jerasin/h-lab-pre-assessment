window.onload = function() {
  console.log('Swagger Custom JS Loaded');
  
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
