export const Navigations = (props) => {
    const { goToSlide, currentSlide } = props;

    const NavIcons = () => {
        var icons = [];
        for (let i = 0; i < 8; i++) {
            icons.push(
                <div
                    className={"nav-icon " + (i === currentSlide ? "nav-active" : "") + " nav-order-" + (i + 1)}
                    onClick={() => goToSlide(i)}
                    key={i}>
                </div>
            );
        }
        return icons;
    }
    return (
        <div className="navigations">
            <NavIcons />
        </div>
    );
}