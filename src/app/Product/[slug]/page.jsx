"use client";
import { useParams } from "next/navigation";
import styles from "../Product.module.scss";
import Image from "next/image";
export default function Product() {
    const params = useParams();
    const id = params.slug;
    console.log(id);
    const items = [
        {id: 1, name: "Металлические двери", img: "/images/Catalog/Product_1.webp" , description: `"СПО Огнещит" предлагает высококачественные противопожарные стальные двери различных конфигураций.`},
        {id: 2, description: "aaaaaaa"},
    ];
    const selectedItem = items.find(item => item.id == id);
    console.log(selectedItem);
    return (
        <>
        {selectedItem && (
        <div className={styles.productConteiner}>
            <button onClick={() => window.history.back()} className={styles.backButton}>
                ← Назад
            </button>
            <h3 className={styles.productTitle}>
                {selectedItem.name}
            </h3>
            <Image src={selectedItem.img} height={100} width={100} alt={selectedItem.name}/>
            <p>{selectedItem.description}</p>
        </div>
        )}
        </>
    )
}