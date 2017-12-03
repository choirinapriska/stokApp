-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2017 at 07:41 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stok`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barang`
--

CREATE TABLE `tbl_barang` (
  `ID` varchar(12) NOT NULL,
  `ID_Kategori` int(5) NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `Alias` varchar(50) DEFAULT NULL,
  `Harga` int(12) NOT NULL,
  `Satuan` varchar(10) NOT NULL,
  `Stok` int(5) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateUpd` datetime DEFAULT NULL,
  `AddBy` varchar(10) NOT NULL,
  `UpdBy` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barang`
--

INSERT INTO `tbl_barang` (`ID`, `ID_Kategori`, `Nama`, `Alias`, `Harga`, `Satuan`, `Stok`, `DateAdd`, `DateUpd`, `AddBy`, `UpdBy`) VALUES
('B00000000007', 2, 'lalalala', 'دجاج الدجاج', 300000, 'kg', 0, '2017-12-01 15:02:23', NULL, '', '0000-00-00 00:00:00'),
('B00002', 1, 'Ayam Dada', 'دجاج الدجاج', 16000, 'kg', 5, '2017-11-02 10:20:44', NULL, '0000-00-00', '0000-00-00 00:00:00'),
('B00003', 1, 'Ayam Utuh', 'دجاج كامل', 80000, 'Kg', 4, '2017-11-02 12:14:27', NULL, '0000-00-00', '0000-00-00 00:00:00'),
('B00004', 1, 'Ayam paha', '-', 5000, 'kg', 5, '2017-11-02 12:15:02', NULL, '0000-00-00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bpb`
--

CREATE TABLE `tbl_bpb` (
  `ID` varchar(12) NOT NULL,
  `ID_PO` varchar(12) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(5) NOT NULL,
  `UpdBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Bukti Penerimaan Barang';

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bpmb`
--

CREATE TABLE `tbl_bpmb` (
  `ID` varchar(12) NOT NULL,
  `ID_Gudang` int(5) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(5) NOT NULL,
  `UpdBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Bukti Pakai Barang';

--
-- Dumping data for table `tbl_bpmb`
--

INSERT INTO `tbl_bpmb` (`ID`, `ID_Gudang`, `DateAdd`, `DateUpd`, `AddBy`, `UpdBy`) VALUES
('DG0000000001', 1, '2017-12-03 02:45:35', '0000-00-00 00:00:00', '', ''),
('DG0000000002', 2, '2017-12-03 02:08:57', '0000-00-00 00:00:00', '', ''),
('DG0000000003', 1, '2017-12-03 02:16:02', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dapur`
--

CREATE TABLE `tbl_dapur` (
  `ID` int(5) NOT NULL,
  `Nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_dapur`
--

INSERT INTO `tbl_dapur` (`ID`, `Nama`) VALUES
(2, 'Dapur 12'),
(3, 'Dapur 3'),
(4, 'Dapur 4');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departemen`
--

CREATE TABLE `tbl_departemen` (
  `ID` varchar(12) NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `PIC` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_departemen`
--

INSERT INTO `tbl_departemen` (`ID`, `Nama`, `PIC`) VALUES
('SP0000000002', 'Departemen 21', 95),
('SP00001', 'Departemen 1', 9);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_bpb`
--

CREATE TABLE `tbl_detail_bpb` (
  `ID` int(5) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Qty_Pesan` int(5) NOT NULL,
  `Qty_Terima` int(5) NOT NULL,
  `Qty_Belum_Terima` int(5) NOT NULL,
  `Keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Detail Bukti Penerimaan Barang';

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_bpmb`
--

CREATE TABLE `tbl_detail_bpmb` (
  `ID` int(5) NOT NULL,
  `ID_BPMB` varchar(12) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Qty` int(5) NOT NULL,
  `NamaPengguna` varchar(10) NOT NULL,
  `Keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Detail Bukti Pakai Barang';

--
-- Dumping data for table `tbl_detail_bpmb`
--

INSERT INTO `tbl_detail_bpmb` (`ID`, `ID_BPMB`, `ID_Barang`, `Qty`, `NamaPengguna`, `Keterangan`) VALUES
(1, 'DG0000000002', 'B00002', 6, 'ddd', 'dsdsd'),
(2, 'DG0000000002', 'B00004', 2, 'ddsd', 'dsds'),
(3, 'DG0000000002', 'B00003', 5, 'dsds', '444'),
(4, 'DG0000000003', 'B00002', 2, 'dsdsd', 'assdsd'),
(5, 'DG0000000003', 'B00004', 3, 'dd55', ''),
(6, 'DG0000000001', 'B00002', 5, 'dsds', 'dsds'),
(7, 'DG0000000001', 'B00004', 5, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_pindah_gudang`
--

CREATE TABLE `tbl_detail_pindah_gudang` (
  `ID` int(5) NOT NULL,
  `ID_PindahGudang` varchar(12) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Qty` int(5) NOT NULL,
  `Keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_detail_pindah_gudang`
--

INSERT INTO `tbl_detail_pindah_gudang` (`ID`, `ID_PindahGudang`, `ID_Barang`, `Qty`, `Keterangan`) VALUES
(8, 'PG0000000001', 'B00002', 5, '1dd'),
(9, 'PG0000000001', 'B00004', 4, 'dfdfdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_po`
--

CREATE TABLE `tbl_detail_po` (
  `ID` int(5) NOT NULL,
  `ID_PO` varchar(12) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Qty` int(5) NOT NULL,
  `UOM` varchar(15) NOT NULL,
  `Disc` int(5) NOT NULL,
  `Total` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='DetailPurchaseOrder';

--
-- Dumping data for table `tbl_detail_po`
--

INSERT INTO `tbl_detail_po` (`ID`, `ID_PO`, `ID_Barang`, `Qty`, `UOM`, `Disc`, `Total`) VALUES
(8, 'PO0000000001', 'B00000000007', 1, '3', 6, 282000),
(9, 'PO0000000002', 'B00000000007', 1, '4', 5, 285000),
(10, 'PO0000000002', 'B00002', 3, '0', 9, 43680),
(11, 'PO0000000002', 'B00003', 8, '0', 0, 640000);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_pr`
--

CREATE TABLE `tbl_detail_pr` (
  `ID` int(5) NOT NULL,
  `ID_PR` varchar(12) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Qty` int(5) NOT NULL,
  `Total` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Detail Permintaan Barang';

--
-- Dumping data for table `tbl_detail_pr`
--

INSERT INTO `tbl_detail_pr` (`ID`, `ID_PR`, `ID_Barang`, `Qty`, `Total`) VALUES
(15, 'PR0000000001', 'B00000000007', 1, 300000),
(16, 'PR0000000001', 'B00002', 2, 32000),
(17, 'PR0000000001', 'B00003', 2, 160000),
(18, 'PR0000000001', 'B00004', 4, 20000),
(19, 'PR0000000002', 'B00000000007', 1, 300000),
(20, 'PR0000000002', 'B00004', 3, 15000),
(21, 'PR0000000002', 'B00002', 1, 16000);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gudang`
--

CREATE TABLE `tbl_gudang` (
  `ID` int(5) NOT NULL,
  `Nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_gudang`
--

INSERT INTO `tbl_gudang` (`ID`, `Nama`) VALUES
(1, 'Gudang 1'),
(2, 'Gudang 3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kategori`
--

CREATE TABLE `tbl_kategori` (
  `ID` int(5) NOT NULL,
  `NamaKategori` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_kategori`
--

INSERT INTO `tbl_kategori` (`ID`, `NamaKategori`) VALUES
(1, 'Bahan utama'),
(2, 'Sayur'),
(3, 'Buah'),
(4, 'Bumbu Mentah'),
(5, 'Lain Lain'),
(11, 'coba123'),
(12, 'cobadddd');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_log_barang`
--

CREATE TABLE `tbl_log_barang` (
  `ID` int(5) NOT NULL,
  `ID_Barang` varchar(12) NOT NULL,
  `Keterangan` text NOT NULL,
  `Stok_Masuk` int(5) NOT NULL,
  `Stok_Keluar` int(5) NOT NULL,
  `Saldo` int(10) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `AddBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='LogStokBarang';

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pakai_barang`
--

CREATE TABLE `tbl_pakai_barang` (
  `ID` varchar(12) NOT NULL,
  `ID_Gudang` int(5) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(5) NOT NULL,
  `UpdBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Bukti Pakai Barang';

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pindah_gudang`
--

CREATE TABLE `tbl_pindah_gudang` (
  `ID` varchar(12) NOT NULL,
  `ID_Gudang_Asal` int(5) NOT NULL,
  `ID_GudangKirim` int(5) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(5) NOT NULL,
  `UpdBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_pindah_gudang`
--

INSERT INTO `tbl_pindah_gudang` (`ID`, `ID_Gudang_Asal`, `ID_GudangKirim`, `DateAdd`, `DateUpd`, `AddBy`, `UpdBy`) VALUES
('PG0000000001', 1, 2, '2017-12-03 03:30:13', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_po`
--

CREATE TABLE `tbl_po` (
  `ID` varchar(12) NOT NULL,
  `ID_Supplier` varchar(12) NOT NULL,
  `Term` varchar(12) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(5) NOT NULL,
  `UpdBy` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='PurchaseOrder';

--
-- Dumping data for table `tbl_po`
--

INSERT INTO `tbl_po` (`ID`, `ID_Supplier`, `Term`, `DateAdd`, `DateUpd`, `AddBy`, `UpdBy`) VALUES
('PO0000000001', 'SP0000000003', '5', '2017-12-02 14:00:52', '0000-00-00 00:00:00', '', ''),
('PO0000000002', 'SP00001', '2', '2017-12-02 14:04:52', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pr`
--

CREATE TABLE `tbl_pr` (
  `ID` varchar(12) NOT NULL,
  `ID_Departement` varchar(12) NOT NULL,
  `Total_Price` int(15) NOT NULL,
  `DateAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DateUpd` datetime NOT NULL,
  `AddBy` varchar(20) NOT NULL,
  `UpdBy` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='PermintaanBarang';

--
-- Dumping data for table `tbl_pr`
--

INSERT INTO `tbl_pr` (`ID`, `ID_Departement`, `Total_Price`, `DateAdd`, `DateUpd`, `AddBy`, `UpdBy`) VALUES
('PR0000000001', 'SP0000000002', 512000, '2017-12-02 09:02:59', '0000-00-00 00:00:00', '', ''),
('PR0000000002', 'SP0000000002', 331000, '2017-12-02 09:36:36', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE `tbl_supplier` (
  `ID` varchar(12) NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `Alamat` text NOT NULL,
  `Telp` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='PurchaseOrder';

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`ID`, `Nama`, `Alamat`, `Telp`) VALUES
('SP0000000003', 'Lala Lili', 'Jl. Karya Timur Gg Wonosari 7B', '083848325155'),
('SP00001', 'Supplier 1', 'jl. brigjen katamso IV no 9', '083834456732'),
('SP00002', 'Priska Choirina', 'Jl. Karya Timur Gg Wonosari 7B', '083848325155');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Kategori` (`ID_Kategori`);

--
-- Indexes for table `tbl_bpb`
--
ALTER TABLE `tbl_bpb`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_bpb_ibfk_2` (`ID_PO`);

--
-- Indexes for table `tbl_bpmb`
--
ALTER TABLE `tbl_bpmb`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_bpmb_ibfk_1` (`ID_Gudang`);

--
-- Indexes for table `tbl_dapur`
--
ALTER TABLE `tbl_dapur`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_departemen`
--
ALTER TABLE `tbl_departemen`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_detail_bpb`
--
ALTER TABLE `tbl_detail_bpb`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_detail_bpb_ibfk_1` (`ID_Barang`);

--
-- Indexes for table `tbl_detail_bpmb`
--
ALTER TABLE `tbl_detail_bpmb`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_detail_bpmb_ibfk_1` (`ID_Barang`),
  ADD KEY `tbl_detail_bpmb_ibfk_2` (`ID_BPMB`);

--
-- Indexes for table `tbl_detail_pindah_gudang`
--
ALTER TABLE `tbl_detail_pindah_gudang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_detail_pindah_gudang_ibfk_1` (`ID_Barang`),
  ADD KEY `tbl_detail_pindah_gudang_ibfk_2` (`ID_PindahGudang`);

--
-- Indexes for table `tbl_detail_po`
--
ALTER TABLE `tbl_detail_po`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Barang` (`ID_Barang`),
  ADD KEY `ID_PO` (`ID_PO`);

--
-- Indexes for table `tbl_detail_pr`
--
ALTER TABLE `tbl_detail_pr`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Barang` (`ID_Barang`),
  ADD KEY `ID_PR` (`ID_PR`);

--
-- Indexes for table `tbl_gudang`
--
ALTER TABLE `tbl_gudang`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_log_barang`
--
ALTER TABLE `tbl_log_barang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_log_barang_ibfk_1` (`ID_Barang`);

--
-- Indexes for table `tbl_pakai_barang`
--
ALTER TABLE `tbl_pakai_barang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_pakai_barang_ibfk_1` (`ID_Gudang`);

--
-- Indexes for table `tbl_pindah_gudang`
--
ALTER TABLE `tbl_pindah_gudang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `tbl_pindah_gudang_ibfk_1` (`ID_GudangKirim`),
  ADD KEY `tbl_pindah_gudang_ibfk_2` (`ID_Gudang_Asal`);

--
-- Indexes for table `tbl_po`
--
ALTER TABLE `tbl_po`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Supplier` (`ID_Supplier`);

--
-- Indexes for table `tbl_pr`
--
ALTER TABLE `tbl_pr`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Departement` (`ID_Departement`) USING BTREE;

--
-- Indexes for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_dapur`
--
ALTER TABLE `tbl_dapur`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_detail_bpb`
--
ALTER TABLE `tbl_detail_bpb`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_detail_bpmb`
--
ALTER TABLE `tbl_detail_bpmb`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_detail_pindah_gudang`
--
ALTER TABLE `tbl_detail_pindah_gudang`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_detail_po`
--
ALTER TABLE `tbl_detail_po`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_detail_pr`
--
ALTER TABLE `tbl_detail_pr`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_gudang`
--
ALTER TABLE `tbl_gudang`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_log_barang`
--
ALTER TABLE `tbl_log_barang`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  ADD CONSTRAINT `tbl_barang_ibfk_1` FOREIGN KEY (`ID_Kategori`) REFERENCES `tbl_kategori` (`ID`);

--
-- Constraints for table `tbl_bpb`
--
ALTER TABLE `tbl_bpb`
  ADD CONSTRAINT `tbl_bpb_ibfk_2` FOREIGN KEY (`ID_PO`) REFERENCES `tbl_po` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_bpmb`
--
ALTER TABLE `tbl_bpmb`
  ADD CONSTRAINT `tbl_bpmb_ibfk_1` FOREIGN KEY (`ID_Gudang`) REFERENCES `tbl_gudang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_bpb`
--
ALTER TABLE `tbl_detail_bpb`
  ADD CONSTRAINT `tbl_detail_bpb_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_bpmb`
--
ALTER TABLE `tbl_detail_bpmb`
  ADD CONSTRAINT `tbl_detail_bpmb_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_detail_bpmb_ibfk_2` FOREIGN KEY (`ID_BPMB`) REFERENCES `tbl_bpmb` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_pindah_gudang`
--
ALTER TABLE `tbl_detail_pindah_gudang`
  ADD CONSTRAINT `tbl_detail_pindah_gudang_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_detail_pindah_gudang_ibfk_2` FOREIGN KEY (`ID_PindahGudang`) REFERENCES `tbl_pindah_gudang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_po`
--
ALTER TABLE `tbl_detail_po`
  ADD CONSTRAINT `tbl_detail_po_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`ID`),
  ADD CONSTRAINT `tbl_detail_po_ibfk_2` FOREIGN KEY (`ID_PO`) REFERENCES `tbl_po` (`ID`);

--
-- Constraints for table `tbl_detail_pr`
--
ALTER TABLE `tbl_detail_pr`
  ADD CONSTRAINT `tbl_detail_pr_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`id`),
  ADD CONSTRAINT `tbl_detail_pr_ibfk_2` FOREIGN KEY (`ID_PR`) REFERENCES `tbl_pr` (`ID`);

--
-- Constraints for table `tbl_log_barang`
--
ALTER TABLE `tbl_log_barang`
  ADD CONSTRAINT `tbl_log_barang_ibfk_1` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pakai_barang`
--
ALTER TABLE `tbl_pakai_barang`
  ADD CONSTRAINT `tbl_pakai_barang_ibfk_1` FOREIGN KEY (`ID_Gudang`) REFERENCES `tbl_gudang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pindah_gudang`
--
ALTER TABLE `tbl_pindah_gudang`
  ADD CONSTRAINT `tbl_pindah_gudang_ibfk_1` FOREIGN KEY (`ID_GudangKirim`) REFERENCES `tbl_gudang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pindah_gudang_ibfk_2` FOREIGN KEY (`ID_Gudang_Asal`) REFERENCES `tbl_gudang` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_po`
--
ALTER TABLE `tbl_po`
  ADD CONSTRAINT `tbl_po_ibfk_1` FOREIGN KEY (`ID_Supplier`) REFERENCES `tbl_supplier` (`ID`);

--
-- Constraints for table `tbl_pr`
--
ALTER TABLE `tbl_pr`
  ADD CONSTRAINT `departementPR` FOREIGN KEY (`ID_Departement`) REFERENCES `tbl_departemen` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
