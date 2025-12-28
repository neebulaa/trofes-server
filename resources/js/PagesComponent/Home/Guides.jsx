

export default function Guides(){
    return (
        <section className="guides" id="guides">
            <div className="container">
                <div className="guides-head">
                    <h2 className="guides-title">Panduan  Untukmu</h2>
                    <img
                        src="/assets/graphics/highlight.png"
                        alt=""
                        className="guides-scribble"
                    />
                    <div className="guides-desc">
                        <div className="guides-cta-box">
                            <p className="about-text">
                                Pahami lebih banyak tentang nutrisi yang Anda butuhkan untuk mendukung gaya hidup sehat dan membuat setiap pilihan makanan lebih tepat.
                            </p>
                            <a className="btn btn-line" href="#panduan">Pelajari Lebih Banyak</a>
                        </div>
                    </div>
                </div>

                <div className="guides-grid">
                    <article className="guide-card">
                        <div className="guide-img">
                            <img src="/assets/sample-images/guide-3.jpg" alt="" />
                        </div>
                        <h3 className="guide-title">Tentang Protein</h3>
                        <p className="guide-text">Protein adalah zat gizi penting yang berfungsi sebagai bahan pembangun tubuh...</p>
                        <span className="guide-date">18/10/25</span>
                    </article>

                    <article className="guide-card">
                        <div className="guide-img">
                            <img src="/assets/sample-images/guide-1.jpg" alt="" />
                        </div>
                        <h3 className="guide-title">Tentang Vitamin</h3>
                        <p className="guide-text">Vitamin adalah senyawa penting yang dibutuhkan tubuh dalam jumlah kecil ...</p>
                        <span className="guide-date">18/10/25</span>
                    </article>

                    <article className="guide-card">
                        <div className="guide-img">
                            <img src="/assets/sample-images/guide-2.jpg" alt="" />
                        </div>
                        <h3 className="guide-title">Tentang Kalori</h3>
                        <p className="guide-text">Kalori adalah satuan energi yang dibutuhkan tubuh untuk beraktivitas. Energi ini...</p>
                        <span className="guide-date">18/10/25</span>
                    </article>
                </div>
            </div>
        </section>
    )
}
