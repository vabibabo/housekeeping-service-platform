# Housekeeping Service Platform

A coursework codebase with a Java Spring Boot backend and a Vue 3 / Quasar frontend. The supplied snapshot includes user, profile and service-order management components.

## Architecture
- **Backend:** Spring Boot 2.7.3, Java 8 target, MyBatis, MySQL and Maven.
- **Frontend:** Vue 3, Quasar 2, Axios, Vue Router and internationalisation files.
- **Code areas:** registration/login, personal profiles, order creation, worker assignment, order completion and user-management screens.

The presence of a route or screen does not establish a verified end-to-end workflow.

## Personal contribution
Lanjie Tang (Donna) was responsible for the frontend part of this coursework project. The `frontend/` directory contains the Vue / Quasar interface, including login and registration, profile, order and user-management pages. The Java backend is included to provide project context; backend authorship is not attributed to Lanjie Tang. The responsibility described here was confirmed by the project owner.

## Local setup
The original database schema/seed dump is not included in the provided source. Reconstructing and checking a schema against `backend/src/main/resources/mapper/` is required before an end-to-end run.

Set `DB_URL`, `DB_USER` and `DB_PASSWORD` in your shell for a local MySQL database, then:

```sh
cd backend
mvn spring-boot:run
```

In a separate terminal with Node.js and npm:

```sh
cd frontend
npm ci
npx quasar dev
```

The historical frontend targets `http://localhost:8080`; its dev server uses port 8081. Use an environment compatible with the existing lockfile. The legacy toolchain has not been modernised or verified by a fresh build.

## Repository preparation
Embedded database credentials were replaced by environment variables. Local logs, generated builds, dependency folders, private reports and editor settings were excluded. Maven wrapper scripts and binary were excluded; use your own Maven installation. Original source attribution and third-party notices are preserved where supplied. This is a coursework archive for review, not an internet-ready service.

## 中文简介
采用 Spring Boot / MyBatis 后端及 Vue / Quasar 前端，包含用户、资料和订单相关模块。负责前端部分，Java 后端作为项目上下文保留。当前缺少原始数据库建表文件，尚未完成全流程运行验证。
