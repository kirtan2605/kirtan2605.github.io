// Case-study copy is grounded in the original report or presentation named in
// each record. Figures are cropped source plots/diagrams from those PDFs.
export const projectCaseStudies = {
    rfic: {
        area: "RF engineering · Amplifier design",
        lead: "How close can a practical 5 GHz matching network bring a BJT amplifier to its theoretical gain? This project moved from transistor S-parameters to an input/output matching schematic and then a microstrip layout, comparing the modeled gain at each step.",
        tags: ["5 GHz", "BJT S-parameters", "Impedance matching", "Microstrip layout"],
        metrics: [
            { value: "50 Ω", label: "system reference impedance" },
            { value: "9.684 dB", label: "schematic gain at 5 GHz" },
            { value: "8.86 dB", label: "layout gain at 5 GHz" },
        ],
        sections: [
            {
                id: "brief", kicker: "01 · The design question", title: "Match the source and load around a real transistor",
                paragraphs: [
                    "The presentation starts with an Infineon BFP540 transistor biased at VCE = 2 V and IC = 3 mA. The system reference impedance is 50 Ω. Rather than connecting the transistor directly to those terminations, the design adds input and output networks to transform the impedances seen at its ports.",
                    "The target was maximum gain near 5 GHz. The transistor S-parameters define the available matching solutions; the team selected a solution that could be realized with passive components, then designed the two networks around it.",
                ],
                figures: [{ image: "assets/images/projects/rfic/page-03.png", alt: "Block diagrams of the transistor between input and output matching networks", label: "Presentation slide 3", caption: "The problem is a two-sided match: source, transistor, and load must be considered together." }],
            },
            {
                id: "method", kicker: "02 · S-parameters to circuits", title: "Turn a gain calculation into realizable matching networks",
                paragraphs: [
                    "The S-parameter calculation gave a theoretical maximum transducer gain of approximately 9.7 dB at 5 GHz. The input and output matching circuits were then constructed to approach the required source and load reflection coefficients.",
                    "At schematic level, the simulated response reached 9.684 dB at 5 GHz. This is a circuit-model result: it shows the network can closely approach the calculated gain before physical layout effects are included.",
                ],
                figures: [{ image: "assets/images/projects/rfic/page-11.png", alt: "S-parameter plots for the impedance-matched amplifier schematic with 9.684 dB gain at 5 GHz", label: "Presentation slide 11", caption: "The schematic simulation approaches the calculated 9.7 dB maximum at the target frequency." }],
            },
            {
                id: "results", kicker: "03 · Layout reality", title: "The microstrip implementation shifts the peak",
                paragraphs: [
                    "The design was translated into a microstrip layout and simulated again. The layout result peaked at 9.618 dB around 4.9 GHz, while gain at the specified 5 GHz was 8.86 dB. The frequency shift and lower on-target gain show why a schematic match is not the final RF answer.",
                    "The final slide presents a tapeout layout. The presentation does not provide a measured hardware gain or a numerical noise-figure result, so this case study treats the plotted values as simulations rather than bench measurements.",
                ],
                figures: [
                    { image: "assets/images/projects/rfic/page-16.png", alt: "Layout S-parameter plots showing 9.618 dB gain at 4.9 GHz and 8.86 dB at 5 GHz", label: "Presentation slide 16", caption: "The physical layout model retains strong gain but moves the best match below 5 GHz." },
                    { image: "assets/images/projects/rfic/page-19.png", alt: "Final amplifier microstrip tapeout layout", label: "Presentation slide 19", caption: "The tapeout image records the geometry reached after matching and layout design." },
                ],
            },
            {
                id: "takeaway", kicker: "04 · What this established", title: "A near-theoretical circuit match, with layout sensitivity",
                paragraphs: [
                    "The project demonstrates the full calculation-to-layout workflow for a 5 GHz BJT amplifier. Its clearest result is the comparison between a near-ideal schematic match and the shifted layout response.",
                    "The next validation step would be a measured prototype, including gain, return loss, and noise figure. The supplied presentation does not establish those measurements, so the page does not claim a fabricated amplifier met them.",
                ],
            },
        ],
        resources: [
            { label: "Open project presentation", url: "assets/reports/RFIC_presentation.pdf" },
        ],
    },
    qpsk: {
        area: "Digital communications · Simulation",
        lead: "A QPSK link can look excellent under perfect synchronization and still fail when the receiver's timing or phase estimate drifts. This MATLAB study built a block-based transmitter/receiver simulation, compared ideal BER with theory, and then introduced more realistic estimation and channel effects.",
        tags: ["QPSK", "MATLAB", "BER", "Pilot symbols", "Pulse shaping"],
        metrics: [
            { value: "AWGN", label: "baseline channel model" },
            { value: "π/4", label: "maximum modeled phase drift per block" },
            { value: "3", label: "pulse shapes compared" },
        ],
        sections: [
            {
                id: "brief", kicker: "01 · The communication problem", title: "Separate modulation errors from receiver-estimation errors",
                paragraphs: [
                    "The simulation organized data into blocks with a leading known training sequence and guard bits. The receiver used those pilot symbols to estimate sampling time and phase before decoding QPSK symbols through additive white Gaussian noise.",
                    "The project asked what changes when the receiver no longer has perfect timing and phase knowledge. It also studied a changing phase across one block and the occupied spectrum of different pulse shapes.",
                ],
            },
            {
                id: "baseline", kicker: "02 · Establish the baseline", title: "Ideal BER tracks the analytical AWGN result",
                paragraphs: [
                    "With perfect synchronization and phase correction, the simulated bit-error rate followed the analytical QPSK curve. The agreement improved as more blocks were simulated, which is the expected effect of reducing Monte Carlo sampling noise.",
                    "That baseline matters: only after the ideal implementation matches theory can extra errors be attributed to synchronization, phase estimation, or channel dynamics.",
                ],
                figures: [{ image: "assets/images/projects/qpsk/page-06.png", alt: "Report page with theoretical and simulated QPSK bit-error rate curves for 50 and 100 blocks", label: "Report page 6", caption: "Two BER comparisons show the simulation approaching the theoretical curve as the number of blocks grows." }],
            },
            {
                id: "estimation", kicker: "03 · Test the receiver", title: "Longer pilots helped phase estimation more than timing",
                paragraphs: [
                    "The study compared phase estimated from the pilot with phase inferred from data for several training lengths. More training symbols narrowed the spread of phase-estimation error, while timing synchronization did not show a similarly strong improvement in the tested setup.",
                    "The constellation plots make the effect visible: at low Eb/N0 the QPSK clusters overlap heavily, while at higher values they separate. A phase mismatch rotates the received constellation and can push symbols across decision boundaries even when the noise level is otherwise manageable.",
                ],
                figures: [
                    { image: "assets/images/projects/qpsk/page-07.png", alt: "QPSK pilot phase-estimation plots for several training lengths", label: "Phase estimation · report p. 7", caption: "Longer pilot sequences tighten the distribution of phase-estimation error." },
                    { image: "assets/images/projects/qpsk/page-07-constellation.png", alt: "Received QPSK constellation clusters at three signal-to-noise ratios", label: "Constellations · report p. 7", caption: "The symbol clusters separate as Eb/N0 rises from 0 to 30 dB." },
                ],
            },
            {
                id: "tradeoffs", kicker: "04 · Add channel effects", title: "Phase drift accumulates; pulse shape changes the spectrum",
                paragraphs: [
                    "When the channel phase was made to vary linearly by as much as π/4 during a block, the bit errors increased toward its end. A pilot at the beginning could only correct the phase it observed early in that block; the report proposes using subsequent pilots or interpolation as possible follow-up strategies.",
                    "The report also compared a rectangular pulse with root-raised-cosine variants at roll-off factors 0.20 and 0.75. Their periodograms illustrate the time/frequency-shaping trade-off. These are simulation results, not a measured radio link.",
                ],
                figures: [
                    { image: "assets/images/projects/qpsk/page-08.png", alt: "QPSK bit-error pattern across a block with linearly drifting phase", label: "Phase drift · report p. 8", caption: "Errors increase later in the block as the phase estimate becomes stale." },
                    { image: "assets/images/projects/qpsk/page-08-spectrum.png", alt: "Periodograms for rectangular and root-raised-cosine QPSK pulses", label: "Pulse spectra · report p. 8", caption: "Pulse shaping changes occupied spectrum and spectral roll-off." },
                ],
            },
        ],
        resources: [
            { label: "Read full report", url: "assets/reports/QPSK_project-report.pdf" },
            { label: "View simulation code", url: "https://github.com/kirtan2605/Analysis-of-QPSK-Modulation-and-Synchronization/tree/master/src" },
        ],
    },
    ddm: {
        area: "Data-driven methods · Image compression",
        lead: "What is lost when a multichannel image is reduced to a small representation—and what must be stored to reconstruct it? This comparative study tested linear decompositions and neural-network encoders against visual quality, compactness, and interpretability.",
        tags: ["SVD", "Fourier transform", "Autoencoders", "CNN", "Reconstruction"],
        metrics: [
            { value: "5", label: "method families discussed" },
            { value: "0.10–10.27%", label: "illustrated transform storage range" },
            { value: "10", label: "CNN training epochs in reported tests" },
        ],
        sections: [
            {
                id: "brief", kicker: "01 · The comparison", title: "Compression is more than a visually recognizable image",
                paragraphs: [
                    "The project compared singular value decomposition, the discrete Fourier transform, a fully connected autoencoder, a convolutional autoencoder, and a hierarchical CNN autoencoder on color image data. It considered how many coefficients or latent values were retained and what the reconstruction preserved.",
                    "The methods do not have identical storage accounting. A transform reconstruction may need basis information; a trained autoencoder also needs its weights and biases. The report explicitly warns that a tiny latent vector alone is not the full compressed file size.",
                ],
            },
            {
                id: "transforms", kicker: "02 · Linear methods", title: "Compare image-specific SVD modes with a universal Fourier basis",
                paragraphs: [
                    "SVD kept the leading singular modes for each color channel. At low rank, the large scene structure reappeared before fine texture; the report illustrates reconstructions from rank 1 through 100, with stated storage fractions from 0.10% to 10.27% for that representation.",
                    "Fourier truncation retained selected frequency coefficients. It reconstructed the same scene at matching reported storage fractions, showing a different progression of blur and detail. SVD uses an image-specific basis, while a Fourier basis is fixed; that affects both visual behavior and what information must be stored.",
                ],
                figures: [
                    { image: "assets/images/projects/ddm/page-08.png", alt: "Original image and low-rank SVD reconstruction at 0.10 percent storage", label: "SVD · report p. 8", caption: "At 0.10% storage, the low-rank approximation retains broad structure but loses detail." },
                    { image: "assets/images/projects/ddm/page-14.png", alt: "Original image and Fourier reconstruction at 0.21 percent storage", label: "Fourier · report p. 14", caption: "A selected low-storage Fourier result offers a visual comparison with the SVD approach." },
                ],
            },
            {
                id: "learned", kicker: "03 · Learned representations", title: "Neural encoders trade a compact code for a trained model",
                paragraphs: [
                    "A fully connected autoencoder used a bottleneck of nine values per channel on a scaled-down image. It generated a recognizable reconstruction, but its trained model parameters must be included in any honest storage comparison.",
                    "The convolutional models instead use local image structure. In the reported CNN-autoencoder runs, increasing latent features made important scene elements more recognizable even though channel-wise mean-square-error changes were modest. The hierarchical variant attempted to order useful features, but the report notes that ten training epochs limited deeper models and that training outcomes were not unique.",
                ],
                figures: [
                    { image: "assets/images/projects/ddm/page-22.png", alt: "CNN autoencoder reconstructions at different latent lengths", label: "CNN results · report p. 22", caption: "More latent features visibly improve scene recognition, even where MSE changes are modest." },
                    { image: "assets/images/projects/ddm/page-25.png", alt: "Hierarchical convolutional autoencoder reconstructions for several hierarchy sizes", label: "Report page 25", caption: "The hierarchy experiment also exposes the limits of short training and larger model complexity." },
                ],
            },
            {
                id: "takeaway", kicker: "04 · What the comparison shows", title: "No method wins on every definition of compression",
                paragraphs: [
                    "SVD offers ordered, orthogonal modes tailored to the image; Fourier coefficients use a fixed frequency basis; learned encoders can capture nonlinear structure. The meaningful choice depends on image content, desired reconstruction fidelity, and whether training and model-storage costs are counted.",
                    "The report is a method comparison on a limited image example, not a benchmark proving a universal winner. The most useful lesson is to compare both reconstruction quality and the complete information needed to reproduce it.",
                ],
            },
        ],
        resources: [
            { label: "Read full report", url: "assets/reports/DDM_project-report.pdf" },
            { label: "View project code", url: "https://github.com/kirtan2605/Data-Driven-Image-Compression" },
        ],
    },
    tsa: {
        area: "Statistics · Time-series modeling",
        lead: "A series can contain a trend, repeating seasonality, and correlated residual behavior at the same time. This R-based study worked through decomposition and model selection on airline passengers, the Dow Jones index, and an ECG signal, then checked whether the remaining residuals behaved like noise.",
        tags: ["R", "Decomposition", "ACF/PACF", "ARMA", "Residual checks"],
        metrics: [
            { value: "144", label: "monthly airline observations" },
            { value: "AR(1)", label: "selected Dow Jones model" },
            { value: "ARMA(4,5)", label: "selected ECG model" },
        ],
        sections: [
            {
                id: "decompose", kicker: "01 · Make the structure visible", title: "Separate trend and seasonality before modeling noise",
                paragraphs: [
                    "The AirPassengers series covers 144 monthly observations from 1949 to 1960. Its fluctuations grow with the level, so the report treats it as multiplicative and takes a logarithm to obtain an additive trend + seasonal + incidental representation.",
                    "After detrending, the annual seasonal shape is estimated by averaging corresponding months across years. Removing that repeated component leaves an incidental series; the trend is recovered from the remaining difference. This step explains what the model is trying to forecast rather than treating the raw curve as one undifferentiated signal.",
                ],
                figures: [{ image: "assets/images/projects/tsa/page-10.png", alt: "AirPassengers log series and detrended series, showing seasonal fluctuation", label: "Report page 10", caption: "The log transformation and detrending turn visibly growing seasonal swings into a more separable series." }],
            },
            {
                id: "dow", kicker: "02 · Fit a financial series", title: "An AR(1) model explained the studied Dow Jones sequence",
                paragraphs: [
                    "For the Dow Jones index, the report first logged and detrended the data. Its autocorrelation decayed slowly while partial autocorrelation largely cut off after the first lag, suggesting a first-order autoregressive model.",
                    "AIC comparison across candidate orders supported ARIMA(1,0,0), equivalent here to AR(1). The reported coefficient was 0.9966. The residual ACF was then checked and judged consistent with white noise for this fitted series; that is a diagnostic of this model on these data, not a guarantee of future market predictability.",
                ],
                figures: [{ image: "assets/images/projects/tsa/page-14.png", alt: "Dow Jones autocorrelation and partial autocorrelation plots with the selected AR(1) model", label: "Report page 14", caption: "The ACF/PACF pattern motivates the order choice before AIC and residual checks are applied." }],
            },
            {
                id: "ecg", kicker: "03 · Test a different signal", title: "The ECG needed both autoregressive and moving-average terms",
                paragraphs: [
                    "The ECG series showed repeat structure and different correlation behavior. Searching candidate models up to ARMA(5,5) by AIC selected ARMA(4,5), with ARMA(5,4) reported as a similarly good alternative.",
                    "The residual plot and residual ACF were used to check whether the fitted model left substantial structure unexplained. This second example shows that model order is data-dependent; the Dow Jones AR(1) is not a general template for unrelated measurements.",
                ],
                figures: [{ image: "assets/images/projects/tsa/page-18.png", alt: "ECG ARMA model expression and residual and residual-ACF diagnostics", label: "Report page 18", caption: "The ECG model was checked against residual behavior after selection by AIC." }],
            },
            {
                id: "takeaway", kicker: "04 · The procedure", title: "A repeatable sequence, not one magic model",
                paragraphs: [
                    "The report's transferable procedure is to inspect the series, transform or decompose it where needed, use ACF/PACF and information criteria to select candidate orders, and finally test the residuals. Spectral smoothing adds a complementary view of frequency content.",
                    "Each conclusion is tied to its dataset and chosen preprocessing. A cleaner residual sequence supports the fit, but out-of-sample forecasting performance would need a separate evaluation.",
                ],
            },
        ],
        resources: [
            { label: "Read full report", url: "assets/reports/TSA_project-report.pdf" },
            { label: "View R project code", url: "https://github.com/kirtan2605/UTwente-191571090-Time_Series_Analysis/tree/master" },
        ],
    },
    aiitra: {
        area: "Robotics · Multi-agent coverage",
        lead: "How can several cleaning robots divide an area without wasting time or leaving gaps? This team report combined a physical robot concept with multi-robot area partitioning, explored where DARP fails to converge, and compared online coverage approaches for maps discovered during operation.",
        tags: ["Multi-robot planning", "DARP", "Coverage paths", "Online mapping"],
        metrics: [
            { value: "DARP", label: "multi-robot partitioning method" },
            { value: "2", label: "online planning approaches discussed" },
            { value: ">90%", label: "estimated single-cell cleaning area" },
        ],
        sections: [
            {
                id: "brief", kicker: "01 · System question", title: "Design the robot and its coverage plan together",
                paragraphs: [
                    "The report starts with a disc-shaped cleaning robot concept. Side brushes extend the cleaning footprint; a two-motor, three-wheel arrangement leaves front space for sweeping while keeping maneuverability and equipment packaging in view.",
                    "At the planning level, a map is divided into cells. A path should cover each reachable cell while distributing work across robots, avoiding unnecessary overlap and long travel between disconnected areas.",
                ],
                figures: [{ image: "assets/images/projects/aiitra/page-04.png", alt: "Exploded mechanical view of a disc-shaped cleaning robot with wheels, brushes, and central housing", label: "Report page 4", caption: "The physical concept sets footprint and turning constraints that coverage planning must respect." }],
            },
            {
                id: "partition", kicker: "02 · Divide the area", title: "DARP balances assigned area, but connectivity is fragile",
                paragraphs: [
                    "The DARP approach begins with distance-based cell assignment and adjusts each robot's evaluation matrix to move toward desired area shares. Each assigned region can then receive a spanning-tree coverage path.",
                    "A simple balancing update can split one robot's territory into disconnected islands. The report discusses a connectivity correction and shows the partition evolving over iterations; connected regions matter because a robot cannot execute a clean non-backtracking route through separated pieces.",
                ],
                figures: [
                    { image: "assets/images/projects/aiitra/page-15.png", alt: "DARP partitioning before and after area correction, showing a disconnected colored region", label: "Report page 15", caption: "Equalizing area alone can break spatial connectivity." },
                    { image: "assets/images/projects/aiitra/page-17.png", alt: "Sequence of DARP colored map assignments across iterations", label: "Report page 17", caption: "The reported implementation encountered non-convergence when robots began too close or equal-area constraints were too strict." },
                ],
            },
            {
                id: "online", kicker: "03 · Work with unknown obstacles", title: "Online coverage has to revise the route while moving",
                paragraphs: [
                    "With an incomplete map, the path cannot be planned once and frozen. The report considers template-based sweeping paths and an Epsilon Star approach that tiles the area, marks obstacles and forbidden cells, and uses multi-scale potential surfaces to escape local dead ends.",
                    "The path examples are design and planning illustrations. They explain why a second robot can be deployed to another region instead of forcing the first to backtrack over already cleaned ground.",
                ],
                figures: [
                    { image: "assets/images/projects/aiitra/page-26.png", alt: "Template-based cleaning routes for different obstacle patterns", label: "Template paths · report p. 26", caption: "Predefined route templates cover recognizable cell and obstacle patterns." },
                    { image: "assets/images/projects/aiitra/page-26-epsilon.png", alt: "Epsilon Star coverage path examples around obstacles", label: "Epsilon Star · report p. 26", caption: "Online planning updates the path as obstacles and local dead ends appear." },
                ],
            },
            {
                id: "results", kicker: "04 · Findings and limits", title: "Coverage depends on geometry and deployment conditions",
                paragraphs: [
                    "The report estimates just over 90% cleaning area for a robot traversing a grid cell in straight and turning configurations. That is a geometric cell-level estimate, not a measured guarantee that every multi-robot mission cleans more than 90% of an arbitrary map.",
                    "The clearest algorithmic lesson is the need to trade exact area equality against convergence and connected partitions. The team proposed minimum initial robot separation and allowing modest area imbalance as practical remedies for DARP corner cases.",
                ],
                figures: [
                    { image: "assets/images/projects/aiitra/page-27.png", alt: "Straight-path robot cleaning footprint within a grid cell", label: "Straight pass · report p. 27", caption: "A straight pass reaches just over 90% of the cell in the report's geometric estimate." },
                    { image: "assets/images/projects/aiitra/page-27-turning.png", alt: "Turning-path robot cleaning footprint within a grid cell", label: "Turning pass · report p. 27", caption: "The turn is evaluated separately because the swept footprint changes with the route." },
                ],
            },
        ],
        resources: [
            { label: "Read full team report", url: "assets/reports/AIITRA_project-report.pdf" },
            { label: "View project code", url: "https://github.com/kirtan2605/TKA-AIITRA_Robotics_Challenge-2021" },
        ],
    },
    pie: {
        area: "Simulation · Game theory",
        lead: "Trust emerges differently depending on who plays, how often they meet, and whether mistakes occur. This Python project recreated a configurable Evolution of Trust sandbox, modeling eight strategies in repeated prisoner's-dilemma tournaments and testing how populations change under different rules.",
        tags: ["Python", "Agent strategies", "Iterated games", "Population simulation"],
        metrics: [
            { value: "8", label: "player strategies" },
            { value: "3", label: "documented test cases" },
            { value: "5", label: "configurable rule groups" },
        ],
        sections: [
            {
                id: "rules", kicker: "01 · Make the game explicit", title: "Cooperation is a repeated decision, not a fixed trait",
                paragraphs: [
                    "The simulation uses the prisoner's dilemma: two players can cooperate or cheat, and the payoff depends on both choices. The user can set the starting population, payoff values, rounds per match, replacement count, and probability of a mistaken move.",
                    "Eight strategies are represented, including always-cooperate, always-cheat, Copycat, Copy Kitten, Grudger, Detective, Simpleton, and Random. Their behavior matters only in relation to the other strategies and the environment of repeated encounters.",
                ],
                figures: [{ image: "assets/images/projects/pie/page-05.png", alt: "Icons for the eight trust-game player strategies", label: "Strategy set · report p. 5", caption: "Eight distinct agent types use the same payoff rules but react differently to earlier moves." }],
            },
            {
                id: "engine", kicker: "02 · Build the sandbox", title: "Simulate matches, rank scores, then replace players",
                paragraphs: [
                    "The Python implementation separates player behavior, match scoring, tournaments, and display. A configurable input file drives repeated rounds. Each tournament compares agents' accumulated scores, removes the lowest-ranking players, and duplicates the strongest strategies to form a new population.",
                    "The project began as a single-file prototype and was modularized. Its report documents class and sequence diagrams, plus implementation details such as handling tied scores during replacement.",
                ],
                figures: [{ image: "assets/images/projects/pie/page-10.png", alt: "Sequence diagram of user input, tournament logic, matches, player actions, and plotted results", label: "Report page 10", caption: "The sequence diagram shows how configuration, repeated matches, score updates, and population history connect." }],
            },
            {
                id: "results", kicker: "03 · Observe selection", title: "The winning strategy changes with the test conditions",
                paragraphs: [
                    "The report's three tests did not produce one universal winner. In its longer, lower-miscommunication examples, a more forgiving Copy Kitten or a Grudger population dominated; another shorter case favored always-cheat. The exact final mix depends on starting players, payoffs, replacement count, mistake rate, and duration.",
                    "The population trajectories make the point better than a single final score: early growth can reverse, and a strategy that exploits the first few rounds can lose in a repeated environment. These are sandbox outcomes, not a claim about how real people will behave.",
                ],
                figures: [
                    { image: "assets/images/projects/pie/page-21.png", alt: "Population trajectory for trust simulation test case one", label: "Test case 1 · report p. 21", caption: "The first run shows how the strategy mix changes over successive tournaments." },
                    { image: "assets/images/projects/pie/page-21-case2.png", alt: "Population trajectory for trust simulation test case two", label: "Test case 2 · report p. 21", caption: "A second rule configuration finishes with a different dominant strategy." },
                    { image: "assets/images/projects/pie/page-22.png", alt: "Population trajectory for trust simulation test case three, showing always-cheat increasing", label: "Report page 22", caption: "A shorter test illustrates how an exploitative strategy can dominate before repeated interaction changes the balance." },
                ],
            },
            {
                id: "limits", kicker: "04 · Interpretation", title: "A controlled model of trust, not a social prediction",
                paragraphs: [
                    "The project demonstrates how an object-oriented simulation can make payoff rules and agent behavior inspectable. Varying rules creates a way to test why cooperation sometimes persists and sometimes collapses.",
                    "It inherits the simplifications of the game: discrete strategies, fixed payoffs, and a specific replacement rule. The result should be read as a sensitivity experiment inside those assumptions, with the full report and code available below.",
                ],
            },
        ],
        resources: [
            { label: "Read full report", url: "assets/reports/PIE_project-report.pdf" },
            { label: "View simulation code", url: "https://github.com/kirtan2605/The-Evolution-of-Trust-Sandbox-Simulation/tree/master/src" },
        ],
    },
};
