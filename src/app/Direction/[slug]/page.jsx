"use client";
import { useParams } from "next/navigation";
import styles from "../Direction.module.scss";
export default function Direction() {
    const params = useParams();
    const id = params.slug;
    const items = [
        {id: 1, name: "Металлические двери", img: "/images/Catalog/Product_1.webp" , description: `"СПО Огнещит" предлагает высококачественные противопожарные стальные двери различных конфигураций.`},
        {id: 2, description: "aaaaaaa"},
    ];
    const selectedItem = items.find(item => item.id == id);
    return (
        <>
            {selectedItem && (
                <div className={styles.Direction}>
                    
                </div>
            )}
        </>
    )
}