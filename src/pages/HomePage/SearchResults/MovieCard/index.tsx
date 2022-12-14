import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown'
import MenuButton, { Wrapper as MenuButtonWrapper } from './MenuButton'

const Wrapper = styled.div`
  color: white;
  position: relative;

  > img {
    height: 455;
    width: 319;
    object-fit: fill;
    margin-bottom: 22;
    cursor: pointer;
  }
  > .title {
    opacity: 0.7;
    font-size: 18;
    margin-bottom: 8;
    max-width: 266;
  }
  > .genre {
    opacity: 0.5;
    font-size: 14;
    max-width: 319;
  }
  > .date {
    opacity: 0.7;
    font-size: 14;
    border: 1px solid #979797;
    border-radius: 4px;
    display: inline-block;
    padding: 4 8;
    position: absolute;
    right: 0;
    top: 474;
  }

  &:hover ${MenuButtonWrapper} {
    visibility: visible;
  }
`

interface MovieCardProps {
  coverSrc: string
  title: string
  genre: string[]
  releaseDate: string
  onEdit: () => void
  onDelete: () => void
  onClick: () => void
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572#issuecomment-498242139
  const dropdownRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isDropdownVisible) dropdownRef.current?.focus()
  }, [isDropdownVisible])

  return (
    <Wrapper>
      <img src={props.coverSrc} alt={props.title} onClick={props.onClick} />
      <div className="title">{props.title}</div>
      <div className="genre">{props.genre.join(', ')}</div>
      <div className="date">{props.releaseDate.slice(0, 4)}</div>

      <MenuButton onClick={() => setIsDropdownVisible(true)} />

      {isDropdownVisible && (
        <Dropdown
          onClose={() => setIsDropdownVisible(false)}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          ref={dropdownRef}
        />
      )}
    </Wrapper>
  )
}

export default MovieCard
