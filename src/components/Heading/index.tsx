import { CSSProperties } from 'react'

interface Props {
  children: string
  level: 1 | 2 | 3
  inline?: boolean
}

const getStyles = (
  inline: Props['inline'] = false,
  level: Props['level']
): CSSProperties => {
  return {
    display: inline ? 'inline' : 'block',
    fontWeight: 500,
    fontSize: `${1 + (4 - level) * 0.25}rem`,
    margin: '1em 0',
  }
}

const Heading = ({ children, inline, level }: Props) => {
  const styles = getStyles(inline, level)
  switch (level) {
    case 1:
      return <h1 style={styles}>{children}</h1>
    case 2:
      return <h2 style={styles}>{children}</h2>
    case 3:
      return <h3 style={styles}>{children}</h3>
  }
}

export default Heading
