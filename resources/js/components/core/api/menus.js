const loket = [
    { header : 'Menu Loket' },
    { subitems : 
        [
            { title: 'Daftar Pasien', icon: 'mdi-account-group', path: '/pendaftaran-pasien'},
            { title: 'Kunjungan Pasien', icon: 'mdi-briefcase-account', path: '/kunjungan-pasien'},
            // { title: 'Pembayaran', icon: 'mdi-cash', path: '/pembayaran'},
        ]
    }
]

const dokter = [
    { header : 'Menu Dokter Gigi' },
    { subitems : 
        [
            { title: 'Aksi Dokter Gigi', icon: 'mdi-account-tie', path: '/aksi-dokter-gigi'},
            { title: 'Loket', icon: 'mdi-desktop-classic',
                grups : [
                    { title: 'Daftar Pasien', icon: 'mdi-account-group', path: '/pendaftaran-pasien'},
                    { title: 'Kunjungan Pasien', icon: 'mdi-briefcase-account', path: '/kunjungan-pasien'},
                    { title: 'Pembayaran', icon: 'mdi-cash', path: '/pembayaran'},
                ]
            },
        ]
    }
]

const util = [
    { header : 'Utility' },
    { subitems : 
        [
            { title: 'Surat Keterangan Dokter', icon: 'mdi-contact-mail', path: '/surat-keterangan'},
            // { title: 'Surat Rujukan', icon: 'mdi-email-search', path: '/surat-rujukan'},
            { title: 'Manajemen Data', icon: 'mdi-database-lock',
            grups : [
                { title: 'Kondisi', path: '/kondisi-data'},
                { title: 'Diagnosa', path: '/diagnosa-data'},
                { title: 'Tindakan', path: '/tindakan-data'},
                { title: 'Obat', path: '/obat-data'},
                { title: 'Cara Minum Obat', path: '/cara-minum-data'}
            ]
        },
            
        ]
    }
]

const admin = [
    { header : 'Menu Admin' },
    { subitems : 
        [
            { title: 'Manajemen User', icon: 'mdi-account-switch', path: '/manajemen-user'},
            { title: 'Pengaturan', icon: 'mdi-settings', path: '/pengaturan'},            
        ]
    }
]

const report = [
    { header : 'Menu Laporan' },
    { subitems : 
        [
            { title: 'Laporan', icon: 'mdi-file-chart',
                grups : [
                    { title: 'Laporan Kunjungan', path: '/laporan-kunjungan'},
                    { title: 'Laporan Daftar Pasien', path: '/laporan-daftar-pasien'},
                    { title: 'Laporan Rekam Medik Pasien', path: '/laporan-rekam-medik-pasien'},
                    { title: 'Laporan Diagnosa Terbanyak', path: '/laporan-diagnosa-terbanyak'},
                    { title: 'Laporan Tindakan Terbanyak', path: '/laporan-tindakan-terbanyak'},
                    { title: 'Laporan Biaya Pelayanan', path: '/laporan-biaya-pelayanan'},
                    { title: 'Laporan Pemasukan', path: '/laporan-pemasukan'},
                    { title: 'Laporan Suket', path: '/laporan-suket'},
                ]
            },
            
        ]
    }
]

export default {loket: loket, dokter: dokter, admin: admin, util: util, report: report};