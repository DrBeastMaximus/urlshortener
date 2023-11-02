/*
 Navicat Premium Data Transfer

 Source Server         : SQL Server DB
 Source Server Type    : SQL Server
 Source Server Version : 14001000
 Source Host           : localhost:1433
 Source Catalog        : Demo_URL
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 14001000
 File Encoding         : 65001

 Date: 02/11/2023 16:05:03
*/


-- ----------------------------
-- Table structure for urls
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[urls]') AND type IN ('U'))
	DROP TABLE [dbo].[urls]
GO

CREATE TABLE [dbo].[urls] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [original_url] varchar(2048) COLLATE Vietnamese_CI_AS  NOT NULL,
  [short_code] varchar(10) COLLATE Vietnamese_CI_AS  NOT NULL,
  [created_by_id] int  NOT NULL,
  [created_at] datetime  NOT NULL
)
GO

ALTER TABLE [dbo].[urls] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Uniques structure for table urls
-- ----------------------------
ALTER TABLE [dbo].[urls] ADD CONSTRAINT [UQ__urls__4A58DF5EBAD1424B] UNIQUE NONCLUSTERED ([short_code] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table urls
-- ----------------------------
ALTER TABLE [dbo].[urls] ADD CONSTRAINT [PK__urls__3213E83FED6DB2AB] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

