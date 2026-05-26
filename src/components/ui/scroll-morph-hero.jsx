import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, Sparkles, Hexagon, CircleDashed, Github, Mail, Linkedin, MapPin, Code2 } from "lucide-react";
import { LinePath } from "./svg-follow-scroll";
import { Boxes } from "./background-boxes";

// --- Utility ---
const lerp = (start, end, t) => start * (1 - t) + end * t;

// --- FlipCard Component ---
const IMG_WIDTH = 160;
const IMG_HEIGHT = 200;

function FlipCard({
    item,
    index,
    total,
    phase,
    target,
    onCardClick,
}) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPointerDown={() => setIsHovered(true)}
            onPointerUp={() => setIsHovered(false)}
            initial={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: 0,
                opacity: 0,
            }}
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            onClick={onCardClick}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group z-10 hover:z-50 pointer-events-auto"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                animate={{ rotateY: isHovered ? 180 : 0, scale: isHovered ? 1.05 : 1 }}
            >
                {/* Front Face */}
                <div
                    className={`absolute inset-0 h-full w-full overflow-hidden border-[4px] border-black flex flex-col items-center justify-center p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${item.color}`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.icon && <item.icon className={`w-12 h-12 text-black stroke-[3px] mb-3 transition-transform ${isHovered ? 'scale-110' : ''}`} />}
                    <h3 className="text-sm font-black text-black uppercase tracking-tighter text-center leading-tight break-words px-1">
                        {item.title}
                    </h3>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden border-[4px] border-black bg-white dark:bg-[#111] flex flex-col items-center justify-center p-3 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <p className="text-[10px] font-black text-[#FF66AA] uppercase tracking-widest mb-2 border-b-[3px] border-black dark:border-white pb-1 w-full">Launch</p>
                    <p className="text-xs font-bold text-black dark:text-white uppercase leading-tight">{item.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const MAX_SCROLL = 12000; 

export default function ScrollMorphHero({ items = [] }) {
    const TOTAL_IMAGES = items.length;
    const [introPhase, setIntroPhase] = useState("circle");
    const [containerSize, setContainerSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const isDraggingRef = useRef(false);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = (entries) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });
        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        let touchStartX = 0;
        let lastTouchY = 0;
        let lastTouchTime = 0;
        let velocityY = 0;
        let momentumId = null;
        let touchHistory = []; // Track recent touch points for momentum calculation

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            touchStartY = touch.clientY;
            touchStartX = touch.clientX;
            lastTouchY = touchStartY;
            lastTouchTime = performance.now();
            velocityY = 0;
            isDraggingRef.current = false;
            touchHistory = [{ y: touchStartY, time: lastTouchTime }];

            if (momentumId) {
                cancelAnimationFrame(momentumId);
                momentumId = null;
            }
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const touchY = touch.clientY;
            const touchX = touch.clientX;
            const currentTime = performance.now();

            const deltaY = lastTouchY - touchY;
            const deltaX = touchStartX - touchX;

            // Sensitivity factor for touchscreen drags - boosted on mobile for speed
            const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
            const touchMultiplier = isMobileDevice ? 8.0 : 2.0;
            const adjustedDeltaY = deltaY * touchMultiplier;

            if (Math.abs(touchStartY - touchY) > 8 || Math.abs(deltaX) > 8) {
                isDraggingRef.current = true;
            }

            // Prevent default browser scrolling and bouncing
            if (e.cancelable) {
                e.preventDefault();
            }

            // Record touch in history
            touchHistory.push({ y: touchY, time: currentTime });
            
            // Clean up history to keep only the last 150ms
            const cutoff = currentTime - 150;
            while (touchHistory.length > 2 && touchHistory[0].time < cutoff) {
                touchHistory.shift();
            }

            lastTouchY = touchY;
            lastTouchTime = currentTime;

            const newScroll = Math.min(Math.max(scrollRef.current + adjustedDeltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        const handleTouchEnd = () => {
            const currentTime = performance.now();
            const cutoff = currentTime - 150;
            
            // Filter touch history to the last 150ms
            const recentTouches = touchHistory.filter(t => t.time >= cutoff);
            
            const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
            if (recentTouches.length >= 2) {
                const first = recentTouches[0];
                const last = recentTouches[recentTouches.length - 1];
                const duration = last.time - first.time;
                
                if (duration > 10) {
                    // Velocity = (distance scrolled) / duration
                    const distanceScrolled = first.y - last.y;
                    const touchMultiplier = isMobileDevice ? 8.0 : 2.0;
                    velocityY = (distanceScrolled * touchMultiplier) / duration;
                } else {
                    velocityY = 0;
                }
            } else {
                velocityY = 0;
            }

            // Apply momentum scrolling
            let momentum = velocityY * 16.67; // approx. pixels per frame (assuming 60fps)
            
            if (isMobileDevice) {
                momentum *= 2.5; // Boost mobile touch momentum scroll
            }

            // Limit momentum to a generous max to allow smooth, fast scrolling when flicked hard
            const maxMomentum = isMobileDevice ? 400 : 180;
            if (momentum > maxMomentum) momentum = maxMomentum;
            if (momentum < -maxMomentum) momentum = -maxMomentum;

            // Use a smooth friction factor (0.97 is perfect for fluid scrolling)
            const friction = 0.97;

            const animateMomentum = () => {
                if (Math.abs(momentum) < 0.1) {
                    cancelAnimationFrame(momentumId);
                    momentumId = null;
                    return;
                }

                const newScroll = Math.min(Math.max(scrollRef.current + momentum, 0), MAX_SCROLL);
                scrollRef.current = newScroll;
                virtualScroll.set(newScroll);

                momentum *= friction;
                momentumId = requestAnimationFrame(animateMomentum);
            };

            if (Math.abs(momentum) > 0.5) {
                momentumId = requestAnimationFrame(animateMomentum);
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            if (momentumId) {
                cancelAnimationFrame(momentumId);
            }
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 1000], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling)
    const scrollRotate = useTransform(virtualScroll, [1000, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // 3. Grid Formation
    const gridProgress = useTransform(virtualScroll, [3000, 4500], [0, 1]);
    const smoothGrid = useSpring(gridProgress, { stiffness: 40, damping: 15 });

    // 3.5. Grid Scrolling (Active on mobile viewports to prevent overflow cutoff)
    const gridScrollProgress = useTransform(virtualScroll, [4800, 9500], [0, 1]);
    const smoothGridScroll = useSpring(gridScrollProgress, { stiffness: 40, damping: 20 });

    // 4. Line Path & Footer Slide
    const lineProgress = useTransform(virtualScroll, [0, 12000], [0, 1]);
    const footerY = useTransform(virtualScroll, [10200, 12000], ["100%", "0%"]);
    const smoothFooterY = useSpring(footerY, { stiffness: 60, damping: 20 });
    
    // SVG Dynamic Movement
    const lineX = useTransform(virtualScroll, [0, 6000, 12000], ["0%", "20%", "0%"]);
    const lineY = useTransform(virtualScroll, [0, 6000, 12000], ["-20%", "20%", "40%"]);
    const lineScale = useTransform(virtualScroll, [0, 2000, 12000], [2.5, 1.5, 1.2]);
    const lineOpacity = useTransform(virtualScroll, [0, 1000, 10200, 12000], [0.8, 0.4, 0.4, 0.9]);

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    // Instantly starting from circle phase as requested by user

    // Removed unused scatterPositions memo

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [gridValue, setGridValue] = useState(0);
    const [gridScrollVal, setGridScrollVal] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);
    const [scrollVal, setScrollVal] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeGrid = smoothGrid.on("change", setGridValue);
        const unsubscribeGridScroll = smoothGridScroll.on("change", setGridScrollVal);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        const unsubscribeScroll = virtualScroll.on("change", setScrollVal);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeGrid();
            unsubscribeGridScroll();
            unsubscribeParallax();
            unsubscribeScroll();
        };
    }, [smoothMorph, smoothScrollRotate, smoothGrid, smoothGridScroll, smoothMouseX, virtualScroll]);

    const isMobile = containerSize.width < 768;

    return (
        <div ref={containerRef} className="relative w-full h-[100dvh] touch-none selection:bg-[#FFD21E] selection:text-black overflow-hidden bg-transparent">
            
            {/* Interactive Background Boxes (Light Mode optimized with Dark Mode fallback) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-noise mix-blend-multiply dark:mix-blend-lighten" />
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
                <Boxes className="opacity-80 dark:opacity-45" />
                {/* Radial gradient mask to fade the boxes toward the edges in light mode */}
                <div 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at center, transparent 20%, #FFFBF0 80%)",
                    }}
                />
                {/* Radial gradient mask to fade the boxes toward the edges in dark mode */}
                <div 
                    className="absolute inset-0 w-full h-full pointer-events-none hidden dark:block"
                    style={{
                        background: "radial-gradient(circle at center, transparent 20%, #0D0B14 80%)",
                    }}
                />
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
                <motion.div 
                    className="absolute top-[15%] left-[20%] text-black dark:text-white opacity-20"
                    animate={{ rotate: 360, x: parallaxValue * 0.5, y: -parallaxValue * 0.2 }}
                    transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                >
                    <Hexagon size={80} strokeWidth={4} />
                </motion.div>
                <motion.div 
                    className="absolute top-[30%] right-[15%] text-[#FF66AA] opacity-40"
                    animate={{ x: parallaxValue * -0.6, y: parallaxValue * 0.4 }}
                >
                    <Star size={60} strokeWidth={4} className="fill-[#FF66AA]" />
                </motion.div>
                <motion.div 
                    className="absolute bottom-[25%] left-[10%] text-[#33FF77] opacity-60"
                    animate={{ x: parallaxValue * 0.8, y: parallaxValue * 0.6, rotate: -20 }}
                >
                    <Sparkles size={70} strokeWidth={4} />
                </motion.div>
                <motion.div 
                    className="absolute bottom-[20%] right-[20%] text-[#00E1FF] opacity-30"
                    animate={{ rotate: -360, x: parallaxValue * -0.4, y: parallaxValue * -0.5 }}
                    transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
                >
                    <CircleDashed size={100} strokeWidth={4} />
                </motion.div>
            </div>

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000 pointer-events-none">

                {/* Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 w-full px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-white uppercase italic drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)] dark:drop-shadow-[4px_4px_0_rgba(255,255,255,0.1)]"
                    >
                        LEVEL UP
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#FFD21E] text-black px-6 py-2 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] mt-4 mb-6 text-2xl md:text-4xl font-black uppercase italic inline-block"
                    >
                        GAME NIGHT
                    </motion.div>
                </div>
                
                {/* Scroll Down Prompt - Always visible initially, fades out when grid completely forms */}
                <motion.div 
                    className="absolute bottom-10 z-0 flex flex-col items-center font-bold tracking-[0.2em] text-black dark:text-white uppercase text-xs pointer-events-none"
                    animate={{ opacity: 1 - gridValue }}
                >
                    <span>Scroll to Unlock</span>
                    <motion.div 
                        className="w-[3px] h-10 bg-black dark:bg-white mt-2 origin-top"
                        animate={{ scaleY: [0, 1, 0], translateY: [0, 20, 20] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* Main Container for Cards */}
                <div className="relative flex items-center justify-center w-full h-full pt-10 pointer-events-none">
                    {items.map((item, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        const baseScale = isMobile ? 0.6 : 1;

                        if (introPhase === "scatter" || introPhase === "line") {
                            // Fallback paths (no longer used as we start directly in circle)
                            target = { x: 0, y: 0, rotation: 0, scale: baseScale, opacity: 1 };
                        } else {
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Circle Phase Position
                            const circleRadius = isMobile ? minDimension * 0.45 : minDimension * 0.35;
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                                scale: baseScale,
                            };

                            // Arc Phase Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.6 : 1.2);
                            const arcApexY = containerSize.height * (isMobile ? 0.30 : 0.20);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 120 : 140;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / Math.max(1, (TOTAL_IMAGES - 1));

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.7; 
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 0.9 : 1.6, 
                            };
                            
                            // Intermediate Morph (Circle => Arc)
                            let arcTarget = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(circlePos.scale, arcPos.scale, morphValue),
                            }

                            // Grid Phase Position
                            const cols = isMobile ? 2 : 5;
                            const gapX = isMobile ? 10 : 40;
                            const gapY = isMobile ? 20 : 50;
                            
                            const colIndex = i % cols;
                            const rowIndex = Math.floor(i / cols);
                            const totalRows = Math.ceil(TOTAL_IMAGES / cols);
                            
                            const gridTotalWidth = (cols * IMG_WIDTH) + ((cols - 1) * gapX);
                            const gridTotalHeight = (totalRows * IMG_HEIGHT) + ((totalRows - 1) * gapY);
                            
                            // Calculate centered grid position
                            const gridX = (colIndex * (IMG_WIDTH + gapX)) - (gridTotalWidth / 2) + (IMG_WIDTH / 2) + (parallaxValue * 0.5);
                             
                             let baseGridY = (rowIndex * (IMG_HEIGHT + gapY)) - (gridTotalHeight / 2) + (IMG_HEIGHT / 2);
                             
                             // Responsive overflow grid scrolling on mobile devices
                             if (isMobile && containerSize.height > 0) {
                                 const actualGridHeight = gridTotalHeight * 0.85;
                                 const maxScrollableDistance = actualGridHeight - (containerSize.height - 120); // 120px safety padding
                                 if (maxScrollableDistance > 0) {
                                     const scrollOffset = (gridScrollVal - 0.5) * maxScrollableDistance;
                                     baseGridY -= (scrollOffset / 0.85); // adjust for card scale
                                 }
                             }
                             
                             const gridY = baseGridY; 

                            // Final target blends from ArcTarget -> GridPos
                            const fadeOutRange = scrollVal > 10200 ? Math.max(0, 1 - (scrollVal - 10200) / 600) : 1;
                            target = {
                                x: lerp(arcTarget.x, gridX, gridValue),
                                y: lerp(arcTarget.y, gridY, gridValue),
                                rotation: lerp(arcTarget.rotation, 0, gridValue),
                                scale: lerp(arcTarget.scale, isMobile ? 0.85 : 1, gridValue),
                                opacity: fadeOutRange,
                            };
                        }

                        return (
                            <FlipCard
                                key={item.to}
                                item={item}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                onCardClick={() => {
                                    if (isDraggingRef.current) return;
                                    navigate(item.to);
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Brutalist Footer: Skiper19 Style */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 z-50 bg-[#1F3A4B] text-[#FAFDEE] rounded-t-[40px] border-t-[4px] border-black/10 flex flex-col items-center justify-between min-h-[60vh] pt-16 pb-6 px-6 md:px-12 origin-bottom selection:bg-[#C2F84F] selection:text-black shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
                style={{ y: smoothFooterY }}
            >
                <div className="flex flex-col items-center justify-center flex-grow w-full">
                    <motion.h2 
                        className="text-center text-[10vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-8"
                    >
                        SWASTIK <br /> RAVI SHETTY
                    </motion.h2>
                    
                    <div className="flex flex-col items-center gap-3">
                        <div className="bg-[#C2F84F] text-black px-5 py-1.5 border-[3px] border-black font-black uppercase text-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[-1deg] mb-2">
                            Full Stack Developer
                        </div>
                        <p className="text-lg font-bold uppercase tracking-widest opacity-60">Java • React.js • Node.js</p>
                    </div>
                </div>

                <div className="w-full max-w-7xl mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t-[1px] border-[#FAFDEE]/10 pt-8">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-sm font-medium uppercase tracking-widest opacity-50">LOCATION</p>
                        <p className="text-lg font-bold uppercase">India • Online</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm font-medium uppercase tracking-[0.2em]">
                        <a href="mailto:swastikshetty06ss@gmail.com" className="hover:text-[#C2F84F] transition-colors">EMAIL</a>
                        <a href="https://linkedin.com/in/swastik-shetty-186802235" target="_blank" rel="noreferrer" className="hover:text-[#C2F84F] transition-colors">LINKEDIN</a>
                        <a href="https://github.com/SwastikShetty06" target="_blank" rel="noreferrer" className="hover:text-[#C2F84F] transition-colors">GITHUB</a>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-1">
                        <p className="text-sm font-medium uppercase tracking-widest opacity-50">DATE</p>
                        <p className="text-lg font-bold uppercase">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
