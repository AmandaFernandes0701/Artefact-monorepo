# Artefact Project - Backend

## Sumário
1. [Introdução](#introdução)
2. [Visão Geral](#visão-geral)
3. [Objetivos do Projeto](#objetivos-do-projeto)
4. [Backend](#backend)
   1. [Estrutura dos Arquivos e Arquitetura do Software](#estrutura-dos-arquivos-e-arquitetura-do-software)
   2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
   3. [Explicação das Partes do Código](#explicação-das-partes-do-código)
   4. [Como Rodar Localmente](#como-rodar-localmente)
   5. [Como Testar no Postman](#como-testar-no-postman)
5. [Frontend](#frontend)
6. [Clonar o Monorepo e Rodar Localmente](#clonar-o-monorepo-e-rodar-localmente)

---

## Introdução

O projeto **Artefact** é uma aplicação focada em gerenciamento de tarefas, onde os usuários podem criar, listar e excluir tarefas. Este repositório contém o backend do projeto, que serve como a API responsável por gerenciar as interações com o banco de dados e fornecer as rotas necessárias para o funcionamento do sistema.

---

## Visão Geral

O objetivo do **Artefact Backend** é fornecer uma API RESTful eficiente para gerenciar as tarefas, implementar um controle de erros adequado, e garantir que o sistema esteja escalável e de fácil manutenção. A arquitetura foi planejada seguindo boas práticas de **Clean Code**, **SOLID**, e boas escolhas de **design patterns**.

---

## Objetivos do Projeto

1. Criar uma API para gerenciar tarefas.
2. Garantir a integridade e segurança dos dados utilizando um banco de dados relacional.
3. Criar endpoints com alta performance e baixo custo de manutenção.
4. Implementar boas práticas de desenvolvimento, como **Clean Code** e **SOLID**.
5. Fornecer endpoints documentados que possam ser facilmente testados e integrados com o frontend.

---

## Backend

### Estrutura dos Arquivos e Arquitetura do Software

A arquitetura adotada no backend segue uma estrutura modularizada e orientada a **camadas**. Aqui está a explicação detalhada da estrutura de arquivos:

