USE [master]
GO
/****** Object:  Database [TripVista]    Script Date: 7/18/2024 3:12:00 PM ******/
CREATE DATABASE [TripVista]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TripVista', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\TripVista.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TripVista_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\TripVista_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [TripVista] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TripVista].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TripVista] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TripVista] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TripVista] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TripVista] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TripVista] SET ARITHABORT OFF 
GO
ALTER DATABASE [TripVista] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [TripVista] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TripVista] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TripVista] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TripVista] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TripVista] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TripVista] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TripVista] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TripVista] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TripVista] SET  ENABLE_BROKER 
GO
ALTER DATABASE [TripVista] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TripVista] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TripVista] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TripVista] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TripVista] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TripVista] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [TripVista] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TripVista] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TripVista] SET  MULTI_USER 
GO
ALTER DATABASE [TripVista] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TripVista] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TripVista] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TripVista] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TripVista] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TripVista] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [TripVista] SET QUERY_STORE = ON
GO
ALTER DATABASE [TripVista] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [TripVista]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Destinations]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Destinations](
	[DestinationId] [int] IDENTITY(1,1) NOT NULL,
	[DestinationName] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Location] [nvarchar](255) NULL,
	[ImageUrl] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[DestinationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hotel]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hotel](
	[HotelID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](255) NOT NULL,
	[ZipCode] [nvarchar](20) NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[Website] [nvarchar](100) NULL,
	[NumberOfRooms] [int] NOT NULL,
	[Rating] [int] NOT NULL,
	[Amenities] [nvarchar](max) NULL,
	[CheckInTime] [datetime] NULL,
	[CheckOutTime] [datetime] NULL,
	[ImageUrl] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[HotelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PromotionalOffers]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PromotionalOffers](
	[OfferId] [int] IDENTITY(1,1) NOT NULL,
	[OfferName] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DiscountPercentage] [decimal](5, 2) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[PackageId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OfferId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reservations]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservations](
	[ReservationId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[DestinationId] [int] NOT NULL,
	[PackageId] [int] NOT NULL,
	[ReservationDate] [datetime] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[Status] [nvarchar](50) NOT NULL,
	[HotelID] [int] NULL,
	[TotalPrice] [decimal](18, 2) NOT NULL,
	[NoOfPeople] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ReservationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReservationStatus]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReservationStatus](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TravelPackages]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TravelPackages](
	[PackageId] [int] IDENTITY(1,1) NOT NULL,
	[PackageName] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[DurationDays] [int] NOT NULL,
	[DestinationId] [int] NOT NULL,
	[ImageUrl] [nvarchar](255) NULL,
	[HotelID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PackageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/18/2024 3:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[ImageUrl] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240708101043_CreatingIdentityScheme', N'8.0.6')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'0f163562-451e-4225-994f-e3f3d0da2e0f', N'User', N'USER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'4d3e2ef9-489f-4dba-b7d4-49a20037f90f', N'Admin', N'ADMIN', NULL)
GO
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] ON 

INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (1, N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', N'Admin User')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (2, N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress', N'AdminUser@example.com')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (3, N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'http://schemas.microsoft.com/ws/2008/06/identity/claims/role', N'Admin')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (4, N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'UserId', N'a14ad6ee-ade6-4a31-9354-2fba58b1f495')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (5, N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', N'Demo User')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (6, N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress', N'Demo@Gmail.com')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (7, N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'http://schemas.microsoft.com/ws/2008/06/identity/claims/role', N'User')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (8, N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'UserId', N'c31023f9-2c72-4d97-a553-6b39ab4bf11c')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (9, N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', N'Demo User 2')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (10, N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress', N'Demo2@Gmail.com')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (11, N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'http://schemas.microsoft.com/ws/2008/06/identity/claims/role', N'User')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (12, N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'UserId', N'413ba4f4-6abd-47f1-9452-7c94fd736c3a')
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] OFF
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'0f163562-451e-4225-994f-e3f3d0da2e0f')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'0f163562-451e-4225-994f-e3f3d0da2e0f')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'4d3e2ef9-489f-4dba-b7d4-49a20037f90f')
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [UserId]) VALUES (N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'Demo@gmail.com', N'DEMO@GMAIL.COM', N'Demo@gmail.com', N'DEMO@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEJF6GOHcNUK8gvf9EtfgRa5s4h0F5+6K0PyJeE/8vb/w484yTnXuSNnyt859lVio9Q==', N'ORSNE7RV7FS66EPOPCAHC5Z7ZVXY2JON', N'8f690b40-cd71-4819-ab4c-7ec8ca82ee7f', N'9833213922', 0, 0, NULL, 1, 0, 4)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [UserId]) VALUES (N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'AdminUser@example.com', N'ADMINUSER@EXAMPLE.COM', N'AdminUser@example.com', N'ADMINUSER@EXAMPLE.COM', 0, N'AQAAAAIAAYagAAAAEJVD3VF9CYanZiOA0JZcJohrUauPE+H0sFdyT3M5ZM/AiS6ft33YAhnsEzrUi9Fjgg==', N'MZ4QTDOBJC2FK2YNTRWP5Y277IX6I2HX', N'850dff3f-3d1c-4c7b-a972-1e4d9efbb300', N'9834239236', 0, 0, NULL, 1, 0, 1)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [UserId]) VALUES (N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'Sandesh.Rawal@gmail.com', N'SANDESH.RAWAL@GMAIL.COM', N'Sandesh.Rawal@gmail.com', N'SANDESH.RAWAL@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEJ9RduXJkLl4pOuZ0sxcpJmDP85ar6UjMNKEMgJT44BsePMKfHAhtHmf820GqRnbzA==', N'VEKR74H5EKMAVGSYVH3P7CZB2ZERI4RR', N'2f3d5b89-4ef0-4018-b102-7b7a15c07682', N'9834294817', 0, 0, NULL, 1, 0, 3)
GO
INSERT [dbo].[AspNetUserTokens] ([UserId], [LoginProvider], [Name], [Value]) VALUES (N'413ba4f4-6abd-47f1-9452-7c94fd736c3a', N'Default', N'RefreshToken', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRGVtbyBVc2VyIDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJEZW1vMkBHbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiVXNlcklkIjoiNDEzYmE0ZjQtNmFiZC00N2YxLTk0NTItN2M5NGZkNzM2YzNhIiwiZXhwIjoxNzIxODk1OTc5LCJpc3MiOiJQSENKV1QiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDQ2In0.ut7SJJ2uHVE243ixNXdJF7jxiEhTuS-Br5A75l456UU')
INSERT [dbo].[AspNetUserTokens] ([UserId], [LoginProvider], [Name], [Value]) VALUES (N'a14ad6ee-ade6-4a31-9354-2fba58b1f495', N'Default', N'RefreshToken', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4gVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkFkbWluVXNlckBleGFtcGxlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiVXNlcklkIjoiYTE0YWQ2ZWUtYWRlNi00YTMxLTkzNTQtMmZiYTU4YjFmNDk1IiwiZXhwIjoxNzIxODkyMzIzLCJpc3MiOiJQSENKV1QiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDQ2In0.8PBfw9QV2OtV5PG-YtOW-GgrNQPsdpDtqwFxoPkQZCA')
INSERT [dbo].[AspNetUserTokens] ([UserId], [LoginProvider], [Name], [Value]) VALUES (N'c31023f9-2c72-4d97-a553-6b39ab4bf11c', N'Default', N'RefreshToken', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRGVtbyBVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiRGVtb0BHbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiVXNlcklkIjoiYzMxMDIzZjktMmM3Mi00ZDk3LWE1NTMtNmIzOWFiNGJmMTFjIiwiZXhwIjoxNzIxODc5MTQwLCJpc3MiOiJQSENKV1QiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDQ2In0.2q9ZDBs4En8-r08EwcZKYI4ysXTPZLh2yAy6QPJGSnQ')
GO
SET IDENTITY_INSERT [dbo].[Destinations] ON 

INSERT [dbo].[Destinations] ([DestinationId], [DestinationName], [Description], [Location], [ImageUrl]) VALUES (1, N'Goa', N'Goa is a tropical state in India known for its stunning beaches, vibrant culture, and natural beauty. ', NULL, N'../../images/Destinations/1_Goa.jpg')
INSERT [dbo].[Destinations] ([DestinationId], [DestinationName], [Description], [Location], [ImageUrl]) VALUES (3, N'Kerala', N'Kerala is known for its lush green landscapes, backwaters, coconut groves, and beautiful beaches.', NULL, N'../../images/Destinations/3_Kerala.jfif')
SET IDENTITY_INSERT [dbo].[Destinations] OFF
GO
SET IDENTITY_INSERT [dbo].[Hotel] ON 

INSERT [dbo].[Hotel] ([HotelID], [Name], [Address], [ZipCode], [PhoneNumber], [Email], [Website], [NumberOfRooms], [Rating], [Amenities], [CheckInTime], [CheckOutTime], [ImageUrl]) VALUES (1, N'Hotel Bonanza', N' Calangute, Nr. Ars Mobiles Shop, Goa', N'12122', N'832 227 6010', N'HotelBonanza@Example.com', NULL, 50, 3, N'wifi', CAST(N'2024-07-12T00:00:00.000' AS DateTime), CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'../../images/Hotels/HotelBonanza.jpg')
INSERT [dbo].[Hotel] ([HotelID], [Name], [Address], [ZipCode], [PhoneNumber], [Email], [Website], [NumberOfRooms], [Rating], [Amenities], [CheckInTime], [CheckOutTime], [ImageUrl]) VALUES (3, N'Holiday Inn Resort', N'Mobor Beach, Cavelossim, Goa, Goa ·', N'403731', N'0832 662 6000', N'HolidayInnResort@gmail.com', NULL, 200, 4, N'Private Beach, Swimming Pool, Spa, Water Sports', NULL, NULL, N'../../images/Hotels/3_Holiday Inn Resort.jfif')
SET IDENTITY_INSERT [dbo].[Hotel] OFF
GO
SET IDENTITY_INSERT [dbo].[Reservations] ON 

INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (18, 3, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), CAST(N'2024-07-17T00:00:00.000' AS DateTime), CAST(N'2024-07-17T00:00:00.000' AS DateTime), N'Cancel', 1, CAST(84000.00 AS Decimal(18, 2)), 7)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (19, 3, 1, 2, CAST(N'2024-07-16T11:28:10.540' AS DateTime), CAST(N'2024-07-16T00:00:00.000' AS DateTime), CAST(N'2024-07-19T00:00:00.000' AS DateTime), N'Pending', 1, CAST(83994.00 AS Decimal(18, 2)), 6)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (38, 3, 1, 2, CAST(N'2024-07-16T19:48:01.260' AS DateTime), CAST(N'2024-07-18T00:00:00.000' AS DateTime), CAST(N'2024-07-25T00:00:00.000' AS DateTime), N'Pending', 3, CAST(97993.00 AS Decimal(18, 2)), 7)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (39, 3, 1, 2, CAST(N'2024-07-16T19:51:22.850' AS DateTime), CAST(N'2024-07-18T00:00:00.000' AS DateTime), CAST(N'2024-07-25T00:00:00.000' AS DateTime), N'Pending', 3, CAST(97993.00 AS Decimal(18, 2)), 7)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (40, 3, 1, 2, CAST(N'2024-07-16T19:53:25.667' AS DateTime), CAST(N'2024-07-18T00:00:00.000' AS DateTime), CAST(N'2024-07-25T00:00:00.000' AS DateTime), N'Pending', 3, CAST(69995.00 AS Decimal(18, 2)), 5)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (46, 3, 1, 1, CAST(N'2024-07-17T16:02:11.567' AS DateTime), CAST(N'2024-07-11T00:00:00.000' AS DateTime), CAST(N'2024-07-19T00:00:00.000' AS DateTime), N'Pending', 1, CAST(60000.00 AS Decimal(18, 2)), 5)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (48, 3, 1, 1, CAST(N'2024-07-17T16:11:24.610' AS DateTime), CAST(N'2024-07-24T00:00:00.000' AS DateTime), CAST(N'2024-07-26T00:00:00.000' AS DateTime), N'Confirm', 1, CAST(36000.00 AS Decimal(18, 2)), 3)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (49, 3, 1, 1, CAST(N'2024-07-17T16:13:23.480' AS DateTime), CAST(N'2024-07-18T00:00:00.000' AS DateTime), CAST(N'2024-07-27T00:00:00.000' AS DateTime), N'Confirm', 1, CAST(60000.00 AS Decimal(18, 2)), 5)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (50, 3, 1, 2, CAST(N'2024-07-17T18:16:22.360' AS DateTime), CAST(N'2024-07-12T00:00:00.000' AS DateTime), CAST(N'2024-07-10T00:00:00.000' AS DateTime), N'Confirm', 3, CAST(55996.00 AS Decimal(18, 2)), 4)
INSERT [dbo].[Reservations] ([ReservationId], [UserId], [DestinationId], [PackageId], [ReservationDate], [StartDate], [EndDate], [Status], [HotelID], [TotalPrice], [NoOfPeople]) VALUES (51, 4, 1, 2, CAST(N'2024-07-18T14:04:09.407' AS DateTime), CAST(N'2024-07-17T00:00:00.000' AS DateTime), CAST(N'2024-07-19T00:00:00.000' AS DateTime), N'Confirm', 3, CAST(55996.00 AS Decimal(18, 2)), 4)
SET IDENTITY_INSERT [dbo].[Reservations] OFF
GO
SET IDENTITY_INSERT [dbo].[TravelPackages] ON 

INSERT [dbo].[TravelPackages] ([PackageId], [PackageName], [Description], [Price], [DurationDays], [DestinationId], [ImageUrl], [HotelID]) VALUES (1, N'Goa trip', N'3N/4D package, book now! ', CAST(12000.00 AS Decimal(18, 2)), 4, 1, N'../../images/Packages/1_Goa trip.jpg', 1)
INSERT [dbo].[TravelPackages] ([PackageId], [PackageName], [Description], [Price], [DurationDays], [DestinationId], [ImageUrl], [HotelID]) VALUES (2, N'Goa trip', N'If it''s worth doing, we''ve got it. Find the best tours and activities for your trip. Spend your trip making memories, not missing out while you''re waiting in line.', CAST(13999.00 AS Decimal(18, 2)), 5, 1, N'../../images/Packages/2_Goa trip.jpg', 3)
SET IDENTITY_INSERT [dbo].[TravelPackages] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [IsActive], [ImageUrl]) VALUES (1, N'Admin', N'User', 0, NULL)
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [IsActive], [ImageUrl]) VALUES (2, N'string', N'string', 0, NULL)
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [IsActive], [ImageUrl]) VALUES (3, N'sandesh', N'Rawal', 0, N'undefined')
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [IsActive], [ImageUrl]) VALUES (4, N'Sandesh', N'Rawal', 1, N'../../images/Profiles/4_SandeshOIP.jfif')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 7/18/2024 3:12:01 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Reservat__05E7698AABB477F5]    Script Date: 7/18/2024 3:12:01 PM ******/
ALTER TABLE [dbo].[ReservationStatus] ADD UNIQUE NONCLUSTERED 
(
	[StatusName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Hotel]  WITH CHECK ADD FOREIGN KEY([HotelID])
REFERENCES [dbo].[Hotel] ([HotelID])
GO
ALTER TABLE [dbo].[PromotionalOffers]  WITH CHECK ADD FOREIGN KEY([PackageId])
REFERENCES [dbo].[TravelPackages] ([PackageId])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([DestinationId])
REFERENCES [dbo].[Destinations] ([DestinationId])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([HotelID])
REFERENCES [dbo].[Hotel] ([HotelID])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([PackageId])
REFERENCES [dbo].[TravelPackages] ([PackageId])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[TravelPackages]  WITH CHECK ADD FOREIGN KEY([DestinationId])
REFERENCES [dbo].[Destinations] ([DestinationId])
GO
ALTER TABLE [dbo].[TravelPackages]  WITH CHECK ADD FOREIGN KEY([HotelID])
REFERENCES [dbo].[Hotel] ([HotelID])
GO
USE [master]
GO
ALTER DATABASE [TripVista] SET  READ_WRITE 
GO
