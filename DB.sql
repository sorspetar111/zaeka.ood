-- Създаване на базата данни, ако не съществува
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'WebAppSystemDB')
BEGIN
    CREATE DATABASE WebAppSystemDB;
END
GO

-- Използване на новосъздадената база данни
USE WebAppSystemDB;
GO

-- =================================================================
-- 1. Таблица за Потребители (Users)
-- =================================================================
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL, -- Трябва да съхранява хеширана парола, не чист текст!
    [Role] NVARCHAR(50) NOT NULL CHECK ([Role] IN ('User', 'Administrator', 'PowerAdmin')),
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- Индекс за по-бързо търсене по потребителско име
CREATE NONCLUSTERED INDEX IX_Users_UserName ON Users(UserName);
GO

-- =================================================================
-- 2. Таблица за Региони (Regions)
-- =================================================================
CREATE TABLE Regions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE
);
GO

-- =================================================================
-- 3. Таблица за Секции (Sections)
-- =================================================================
CREATE TABLE Sections (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    RegionId INT NOT NULL,
    CONSTRAINT FK_Sections_Regions FOREIGN KEY (RegionId) REFERENCES Regions(Id) ON DELETE CASCADE
);
GO

-- Индекс за по-бързо филтриране по регион
CREATE NONCLUSTERED INDEX IX_Sections_RegionId ON Sections(RegionId);
GO

-- =================================================================
-- 4. Таблица за Контроли (Controls)
-- =================================================================
CREATE TABLE Controls (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    SectionId INT NOT NULL,
    CONSTRAINT FK_Controls_Sections FOREIGN KEY (SectionId) REFERENCES Sections(Id) ON DELETE CASCADE
);
GO

-- Индекс за по-бързо филтриране по секция
CREATE NONCLUSTERED INDEX IX_Controls_SectionId ON Controls(SectionId);
GO

-- =================================================================
-- 5. Свързваща таблица за права на достъп (UserControlPermissions)
-- =================================================================
CREATE TABLE UserControlPermissions (
    UserId INT NOT NULL,
    ControlId INT NOT NULL,
    CONSTRAINT PK_UserControlPermissions PRIMARY KEY (UserId, ControlId),
    CONSTRAINT FK_UserControlPermissions_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_UserControl_Permissions_Controls FOREIGN KEY (ControlId) REFERENCES Controls(Id) ON DELETE CASCADE
);
GO

-- =================================================================
-- 6. Таблица за събития (EventLogs)
-- =================================================================
CREATE TABLE EventLogs (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    Timestamp DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    EventType NVARCHAR(100) NOT NULL,
    UserId INT NULL, -- Може да е NULL за системни събития или неуспешен логин
    Details NVARCHAR(MAX) NULL,
    AdditionalInfo NVARCHAR(MAX) NULL, -- За допълнителна информация, ако е нужна
    CONSTRAINT FK_EventLogs_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE SET NULL
);
GO

-- Индекс за по-бързо филтриране на събитията по тип и дата
CREATE NONCLUSTERED INDEX IX_EventLogs_EventType_Timestamp ON EventLogs(EventType, Timestamp DESC);
GO

-- =================================================================
-- 7. Вмъкване на първоначални данни (Seeding)
-- =================================================================
-- Добавяне на два "Power Admin" акаунта.
-- ВАЖНО: Паролите тук са в чист текст само за демонстрационни цели.
-- В реално приложение, те трябва да бъдат хеширани преди запис в базата.
-- Например, 'YourStrongPassword123' ще бъде преобразувано до дълъг низ от символи.
-- Парола за двата акаунта: 'SuperAdminPass123!'
DECLARE @PowerAdminPasswordHash NVARCHAR(MAX) = N'AQAAAAEAACcQAAAAEI...'; -- Това е примерен хеш, генериран от ASP.NET Core Identity

INSERT INTO Users (UserName, Email, PasswordHash, [Role], IsActive)
VALUES
('poweradmin1', 'poweradmin1@yourapp.com', @PowerAdminPasswordHash, 'PowerAdmin', 1),
('poweradmin2', 'poweradmin2@yourapp.com', @PowerAdminPasswordHash, 'PowerAdmin', 1);
GO

PRINT 'Database schema and initial data created successfully.';
GO