import { productDetailQueryOptions } from '@/entities/product/api/product-queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import { z } from 'zod';

const ParamsSchema = z.object({
  id: z.string(),
});

export default function ThumbnailSection() {
  const { id } = ParamsSchema.parse(useParams());
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: images } = useSuspenseQuery({
    ...productDetailQueryOptions(id),
    select: data => data.images,
  });

  return (
    <styled.section css={{ bg: 'background.01_white' }}>
      <MainThumbnailImage src={images[selectedImageIndex]} alt={'product-main-image'} />
      <HStack gap={2} css={{ overflowX: 'auto', justifyContent: 'center', pt: 2 }}>
        {images.map((image, index) => (
          <ThumbnailItem
            key={index}
            src={image}
            alt={`product-image-${index + 1}`}
            isSelected={selectedImageIndex === index}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </HStack>
    </styled.section>
  );
}

function MainThumbnailImage({ src, alt }: { src: string; alt: string }) {
  return (
    <styled.img
      src={src}
      alt={alt}
      css={{
        w: 'full',
        aspectRatio: 1,
        objectFit: 'cover',
        bg: 'background.01_gray',
      }}
    />
  );
}

function ThumbnailItem({
  src,
  alt,
  isSelected,
  onClick,
}: {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <styled.img
      src={src}
      alt={alt}
      onClick={onClick}
      role="button"
      css={{
        w: 12,
        h: 12,
        objectFit: 'cover',
        cursor: 'pointer',
        outline: isSelected ? '1px solid' : 'none',
        outlineColor: 'primary.01_primary',
        outlineOffset: isSelected ? '-1px' : 0,
        rounded: 'md',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    />
  );
}
