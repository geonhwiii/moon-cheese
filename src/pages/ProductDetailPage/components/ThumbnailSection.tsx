import { productDetailQueryOptions } from '@/entities/product/api/product-queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import { z } from 'zod';

const ParamsSchema = z.object({
  id: z.string(),
});

function ThumbnailSection() {
  const { id } = ParamsSchema.parse(useParams());
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: images } = useSuspenseQuery({
    ...productDetailQueryOptions(id),
    select: data => data.images,
  });

  return (
    <styled.section css={{ bg: 'background.01_white' }}>
      <styled.img
        src={images[selectedImageIndex]}
        alt={'product-main-image'}
        css={{
          w: 'full',
          aspectRatio: 1,
          objectFit: 'cover',
          bg: 'background.01_gray',
        }}
      />

      {/* 썸네일 이미지 */}
      <HStack gap={2} css={{ overflowX: 'auto', justifyContent: 'center', pt: 2 }}>
        {images.map((image, index) => (
          <styled.img
            key={`thumbnail-${index}`}
            src={image}
            alt={`product-image-${index + 1}`}
            onClick={() => setSelectedImageIndex(index)}
            role="button"
            css={{
              w: 12,
              h: 12,
              objectFit: 'cover',
              cursor: 'pointer',
              outline: selectedImageIndex === index ? '1px solid' : 'none',
              outlineColor: 'primary.01_primary',
              outlineOffset: selectedImageIndex === index ? '-1px' : 0,
              rounded: 'md',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          />
        ))}
      </HStack>
    </styled.section>
  );
}

export default ThumbnailSection;
