### Back-end Questions

  

1. **Assuming the system currently has three microservices: Customer API, Master Data API, and Transaction Data API, there is a new feature that requires data from all three microservices to be displayed in near real-time. The current technology stack includes REST APIs and an RDBMS database. How would you design a new API for this feature?** <br>
Ans: ทำ service กลางขึ้นมาเพื่อเป็นตัวกลางค่อยเรียก 3 service ที่เหลือแบบ parallel เพื่อช่วยลด network latency กับ overhead มีการทำ cache เพื่อลดการประมวลผลซ้ำๆที่ไม่จำเป็น

2. **Assuming the team has started planning a new project, the project manager asks you for a performance test strategy plan for this release. How would you recommend proceeding to the project manager?** <br>
Ans: คุยกับ project manager ก่อนว่าเป้าหมายของ performance test คืออะไร อันไหน priority สำคัญที่ควรทำการทดสอบก่อนหลัง

3. **Design and develop with robust test two APIs using NestJS and Postgres with the following specifications:** <br>
a. Create a Multilingual Product API: Develop an API that allows for the
creation of products, each with attributes for name and description that
support multiple languages. <br>
b. Multilingual Product Search API: Implement an API that enables searching
for products by name in any language and returns results in a paginated
format.

### Additional Requirements
- Validation: Outline how you will validate data inputs in both APIs to ensure data integrity. <br>
Ans: ใช้ class-validator + DTO (Data Transfer Object) ใน NestJS สำหรับ validate input ก่อนส่งเข้า Service Layer
- Database Design: Describe the database schema and the approach you will use to handle multilingual support for product information. <br>
Ans: สร้าง Table Product ไว้เก็บข้อมูล Unique ของ Product เช่น ราคา จำนวน และสร้าง Table ProductTranslation เอาไว้สำหรับเก็บภาษาของ Product โดยใช้ ID ของ Product ในการทำ Relation
- Testing Strategy: Explain your strategy for testing these APIs, including how you will handle unit tests, integration tests, and any end-to-end testing considerations.Please provide a detailed explanation of your design decisions for each of these aspects. <br>
Ans: Unit Test เป็นการทดสอบย่อยในระดับ function จำนวนในการทดสอบจะเยอะเพราะเป็นการทดสอบ function ย่อยๆไป ควรเขียนในทุกๆ function ที่มี logic ที่ซับซ้อนใน function เพื่อลดการเกิด error
     Integration Test เป็นการทดสอบ "การทำงานร่วมกัน" (integration) ของหลาย ๆ ส่วนในระบบ ว่าทำงานถูกต้องเมื่อต่อเข้าด้วยกันจริงๆ ไม่ใช่แค่ทดสอบ function เดี่ยว ๆ แบบ Unit Test ใช้ในแต่เป็นการทดสอบ หลาย module/service/component ที่เชื่อมกัน End-to-End (E2E) Test ทดสอบ full flow ตั้งแต่ request ถึง response แบบ production-like 

# Helper
**How To Run**
```
make dev
```

**Document API**
[swagger](http://localhost:3000/api)