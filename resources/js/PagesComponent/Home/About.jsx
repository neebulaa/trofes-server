export default function About(){
    return (
    <section className="about" id="about">
        <div className="container">
            <img
                src="/assets/graphics/wind-abst.png"
                alt="graphic"
                className="about-scribble"
            />
            <h2 className="about-title">
                Rekomendasi Makanan yang Cerdas Membuat Hidangan Lebih Mudah
            </h2>


            <div className="about-bottom">
                <div className="stats">
                    <div className="stat">
                        <div className="label">Jumlah Resep</div>
                        <div className="value">13K +</div>
                    </div>
                    <div className="stat">
                        <div className="label">Jumlah Bahan Dikenali</div>
                        <div className="value">10K +</div>
                    </div>
                </div>

                <div className="about-cta">
                    <p>
                    Trofes  menjadi asisten gizi pintar yang memberi rekomendasi makanan sesuai kebutuhanmu. Dengan saran yang tepat dan mudah dipahami, kami membantu membuat setiap hidangan lebih sehat, praktis, dan sederhana untuk dipilih setiap hari.
                    </p>

                    <a className="btn btn-line" href="#hubungi">
                        Hubungi Kami Sekarang
                    </a>
                </div>
            </div>
        </div>
    </section>
    )
}