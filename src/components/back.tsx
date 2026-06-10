
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");


function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

interface Star {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

function generateStars(count: number, w: number, h: number): Star[] {
  const rand = seededRand(42);
  return Array.from({ length: count }, () => ({
    cx: rand() * w,
    cy: rand() * h,
    r: rand() * 1.4 + 0.2,
    opacity: rand() * 0.7 + 0.3,
  }));
}

const STARS_SMALL  = generateStars(120, width, height);
const STARS_MEDIUM = generateStars(40,  width, height);
const STARS_BRIGHT = generateStars(12,  width, height);

export default function GalaxyBg() {
 
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        <Defs>

          <RadialGradient id="bg" cx="50%" cy="40%" r="70%">
            <Stop offset="0%"   stopColor="#0A0F2E" stopOpacity="1" />
            <Stop offset="55%"  stopColor="#060B18" stopOpacity="1" />
            <Stop offset="100%" stopColor="#02040A" stopOpacity="1" />
          </RadialGradient>


          <RadialGradient id="neb1" cx="30%" cy="25%" r="50%">
            <Stop offset="0%"   stopColor="#1A1060" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="#060B18" stopOpacity="0"    />
          </RadialGradient>

          <RadialGradient id="neb2" cx="75%" cy="65%" r="45%">
            <Stop offset="0%"   stopColor="#00304A" stopOpacity="0.50" />
            <Stop offset="100%" stopColor="#060B18" stopOpacity="0"    />
          </RadialGradient>

      
          <RadialGradient id="core" cx="50%" cy="42%" r="30%">
            <Stop offset="0%"   stopColor="#1E1560" stopOpacity="0.40" />
            <Stop offset="100%" stopColor="#060B18" stopOpacity="0"    />
          </RadialGradient>

          <RadialGradient id="milky" cx="50%" cy="50%" r="90%">
            <Stop offset="0%"   stopColor="#0E1840" stopOpacity="0.35" />
            <Stop offset="60%"  stopColor="#060B18" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#02040A" stopOpacity="0"    />
          </RadialGradient>
        </Defs>


        <Rect x="0" y="0" width={width} height={height} fill="url(#bg)" />

  
        <Rect x="0" y="0" width={width} height={height} fill="url(#neb1)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#neb2)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#core)" />


        <Ellipse
          cx={width * 0.5}
          cy={height * 0.45}
          rx={width * 0.9}
          ry={height * 0.18}
          fill="url(#milky)"
          transform={`rotate(-18, ${width * 0.5}, ${height * 0.45})`}
        />


        {STARS_SMALL.map((s, i) => (
          <Circle
            key={`sm-${i}`}
            cx={s.cx} cy={s.cy} r={s.r}
            fill="#C8D8FF"
            fillOpacity={s.opacity * 0.6}
          />
        ))}


        {STARS_MEDIUM.map((s, i) => (
          <Circle
            key={`md-${i}`}
            cx={s.cx} cy={s.cy} r={s.r + 0.4}
            fill="#E0EAFF"
            fillOpacity={s.opacity * 0.85}
          />
        ))}


        {STARS_BRIGHT.map((s, i) => (
          <React.Fragment key={`br-${i}`}>
 
            <Circle
              cx={s.cx} cy={s.cy} r={s.r * 4}
              fill="#00C8F0"
              fillOpacity={0.06}
            />

            <Circle
              cx={s.cx} cy={s.cy} r={s.r + 0.6}
              fill="#FFFFFF"
              fillOpacity={0.95}
            />
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}