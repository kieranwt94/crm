import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Hero from 'components/hero/hero';
import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';

export const BrandSingle = () => {
    const [brand, setBrand] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const fetchBrand = async () => {
            const response = await axios.get(`/api/brands/${id}`);
            setBrand(response.data.brand);
        }
        fetchBrand();
    }, [id]);

    return (
        <>
            <Hero title={brand.name} />
            <Section>
                <ContentBox header="Details" color="red" table>
                    {brand.name}
                </ContentBox>
            </Section>
        </>
    )
}