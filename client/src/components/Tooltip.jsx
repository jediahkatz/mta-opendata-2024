import React, { useRef } from 'react';
import { SubwayLineSymbol } from './SubwayLineSymbol';

const getPosition = (x, y, beakMargin = 20, tooltipHeight = 90) => {
  const windowWidth = window.innerWidth;
  const maxTooltipWidth = 310;
  const padding = 10;

  const isRight = x + maxTooltipWidth + padding > windowWidth;
  
  let position;
  if (isRight) {
    const right = windowWidth - x + beakMargin;
    position = { right, top: y - (tooltipHeight / 2) };
  } else {
    position = { left: x + beakMargin, top: y - (tooltipHeight / 2) };
  }

  return { position, isRight };
};

const Tooltip = ({ x, y, children, positionedLoosely = true, tooltipHeight = 90 }) => {
  const tooltipRef = useRef(null);
  const { position, isRight } = getPosition(x, y, positionedLoosely ? 20 : 12, tooltipHeight);

  return (
    <div ref={tooltipRef} className={`tooltip ${isRight ? 'tooltip-right' : 'tooltip-left'}`} style={position}>
      <div className="tooltip-content">
        {children}
      </div>
      <div className={`tooltip-beak ${isRight ? 'beak-right' : 'beak-left'}`}></div>
    </div>
  );
};

const RidershipTooltip = ({ x, y, stationName, ridership, ridershipLabel, percentage, percentageLabel, positionedLoosely }) => {
  const getStationNameAndLines = (fullName) => {
    const containsLines = fullName.includes('(');
    if (!containsLines) {
      return { name: fullName, lines: [] };
    }
    const name = fullName.slice(0, fullName.lastIndexOf('(')).trim();
    const lines = fullName.slice(fullName.lastIndexOf('(') + 1, fullName.lastIndexOf(')')).split(' ') || [];
    return { name, lines };
  };

  const { name, lines } = getStationNameAndLines(stationName);

  return (
    <Tooltip x={x} y={y} positionedLoosely={positionedLoosely}>
      <div className="tooltip-header">{name}</div>
      <div className="station-lines">
        {lines.map((line, index) => (
          <SubwayLineSymbol key={index} line={line} />
        ))}
      </div>
      <div className="ridership-tooltip-content">
        <div>{ridershipLabel || 'Ridership'}: {Math.round(ridership).toLocaleString()}</div>
        {percentage && <div>({percentage.toFixed(2)}{percentageLabel})</div>}
      </div>
    </Tooltip>
  );
};

export { RidershipTooltip, Tooltip };
