// BRANCHING STORY NODES & COMBAT TRIGGERS
export const storyNodes = {
    'start': {
        location: 'Ruang Arsip Terlarang',
        speaker: 'Sistem Kognitif',
        bgTheme: 'archive',
        text: 'Kesadaranmu perlahan pulih di tengah puing-puing Kuil Logika. Asap biru kemerlip mengepul dari terminal kuno yang retak. Di sampingmu, sebilah bilah energi tumpul masih bergetar lemah.',
        choices: [
            { text: '🔍 Periksa Terminal Kuno yang Retak', nextNode: 'examine_terminal' },
            { text: '🗡️ Ambil Bilah Energi & Buka Pintu Samping', nextNode: 'take_blade' },
            { text: '🧘 Atur Nafas & Lakukan Meditasi Mana', nextNode: 'meditate' }
        ]
    },
    'examine_terminal': {
        location: 'Terminal Kuno',
        speaker: 'Suara Holo',
        bgTheme: 'cipher',
        text: 'Terminal berdering! Layar menampilkan pesan: "Peringatan! Sentinel Arsip telah terinfeksi Wabah Void." Kamu berhasil mengunduh Modul Kode Pemulihan (+20 MP).',
        onEnter: (state) => {
            state.restoreMp(20);
            state.addItem({ id: 'code_module', name: 'Modul Kode', desc: 'Pemulih data kognitif' });
        },
        choices: [
            { text: '🚪 Bergerak ke Lorong Utama', nextNode: 'main_hall' }
        ]
    },
    'take_blade': {
        location: 'Lantai Puing',
        speaker: 'Sistem Narasi',
        bgTheme: 'archive',
        text: 'Kamu menggenggam Bilah Arcane! Serat energinya menyatu dengan pelindung tanganmu. Daya serangmu meningkat! (+5 ATK).',
        onEnter: (state) => {
            state.atk += 5;
        },
        choices: [
            { text: '🚪 Melangkah Tangkas ke Lorong Utama', nextNode: 'main_hall' }
        ]
    },
    'meditate': {
        location: 'Ruang Hening',
        speaker: 'Fikiran Cipher',
        bgTheme: 'archive',
        text: 'Kamu memejamkan mata, memfokuskan aliran kognitif. Tubuhmu menyerap sisa-sisa eter di udara. HP dan MP milikmu pulih sepenuhnya!',
        onEnter: (state) => {
            state.hp = state.maxHp;
            state.mp = state.maxMp;
        },
        choices: [
            { text: '🚪 Bangkit & Menuju Lorong Utama', nextNode: 'main_hall' }
        ]
    },
    'main_hall': {
        location: 'Lorong Bayangan',
        speaker: 'Peringatan Bahaya',
        bgTheme: 'void',
        text: 'Sesampainya di Lorong Bayangan, lantai bergetar hebat! Seekor "Shadow Hound" bermata merah menyala melompat dari kegelapan, taring energinya siap menerkam!',
        choices: [
            { text: '⚔️ Bersiap Bertarung!', startCombat: 'shadow_hound' }
        ]
    },
    'after_hound_victory': {
        location: 'Gerbang Inti Arsip',
        speaker: 'Sistem Narasi',
        bgTheme: 'cipher',
        text: 'Shadow Hound hancur menjadi debu kognitif! Kamu menemukan 40 Koin Gold dan Ramuan Pemulih Kesehatan di sisa-sisa tubuhnya.',
        onEnter: (state) => {
            state.gold += 40;
            state.addItem({ id: 'potion_hp', name: 'Ramuan HP', desc: 'Pulihkan 40 HP' });
        },
        choices: [
            { text: '🔓 Buka Gerbang Inti Arsip', nextNode: 'boss_chamber' }
        ]
    },
    'boss_chamber': {
        location: 'Inti Arsip Bayangan',
        speaker: 'Archive Sentinel',
        bgTheme: 'boss',
        text: 'Di pusat kubah, "Archive Sentinel" raksasa berdiri melayang! Lingkaran rune void berputar di sekelilingnya. "Penyusup... Akses Ditolak! Penghapusan Dimulai!"',
        choices: [
            { text: '💥 Hadapi Sentinel Inti!', startCombat: 'archive_sentinel' }
        ]
    },
    'game_victory': {
        location: 'Puncak Kognitif',
        speaker: 'Sistem Narasi',
        bgTheme: 'cipher',
        text: 'DENGAN TEBASAN TERAKHIR, Sentinel Inti runtuh! Inti Arsip berhasil dimurnikan dari Wabah Void. Kamu telah menyelamatkan pengetahuan peradaban Cipherbound!',
        choices: [
            { text: '🎉 Mainkan Lagi Dari Awal', restart: true }
        ]
    }
};

export const enemiesData = {
    'shadow_hound': {
        name: 'Shadow Hound',
        hp: 45,
        maxHp: 45,
        atk: 12,
        def: 3,
        xpReward: 50,
        goldReward: 40,
        victoryNode: 'after_hound_victory',
        svgType: 'hound'
    },
    'archive_sentinel': {
        name: 'Archive Sentinel',
        hp: 110,
        maxHp: 110,
        atk: 20,
        def: 6,
        xpReward: 200,
        goldReward: 100,
        victoryNode: 'game_victory',
        svgType: 'boss'
    }
};
