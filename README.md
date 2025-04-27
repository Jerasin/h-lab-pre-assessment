### Back-end Questions

1. **Assuming the system currently has three microservices: Customer API, Master Data API, and Transaction Data API, there is a new feature that requires data from all three microservices to be displayed in near real-time. The current technology stack includes REST APIs and an RDBMS database. How would you design a new API for this feature?** <br>
   Ans: สร้าง Service ใหม่ เป็น service ตรงกลาง ทำหน้าที่ รวบรวมข้อมูลจากทั้ง Customer API, Master Data API, และ Transaction Data API

2. **Assuming the team has started planning a new project, the project manager asks you for a performance test strategy plan for this release. How would you recommend proceeding to the project manager?** <br>
   Ans: คุยกับ Project Manager เพื่อให้เข้าใจว่า จะเน้น Load Test, Stress Test, Spike Test, หรือ Endurance Test เป็นหลัก เป้าหมายคืออะไร เช่น รองรับ concurrent users เท่าไหร่, response time ต้องไม่เกินกี่วินาที, หรือเน้นระบบไม่ล่มเวลาภาระหนัก ๆ ตั้ง Acceptance Criteria ให้ชัด

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
  Ans: Unit Testing เป็นการทดสอบ function หรือ method แต่ละตัวแยกจากกัน เพื่อยืนยันว่า logic ทำงานถูกต้องตามที่คาดหวังโดยไม่พึ่งพาส่วนอื่น (เช่น database หรือ external service) Integration Testing ทดสอบการทำงานร่วมกันระหว่างหลาย module หรือหลายชั้น เช่น Controller → Service → Repository → Database End-to-End (E2E) Testing จำลอง flow จริงตั้งแต่รับ request → ผ่าน layer ทั้งหมด → ตอบกลับ response
  เพื่อทดสอบว่าระบบในภาพรวมทำงานตามความคาดหมายจากมุมมองของ user หรือ client

# Helper

**How To Run**

```
make dev
```

**Document API**
[swagger](http://localhost:3000/api)
