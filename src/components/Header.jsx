export default function Header({ isLight, onToggleTheme }) {
  const icon = isLight ? '/assets/images/moon.svg' : '/assets/images/sun.svg'

  return (
    <header>
      <div className="container header-inner">
        <button className="button-sun" onClick={onToggleTheme}>
          <img src={icon} className="img-sun" alt="theme toggle" />
        </button>
      </div>
    </header>
  )
}